/**
 * DB Proxy Worker
 *
 * A standalone Cloudflare Worker that sits in front of the D1 database and
 * enforces table-level access control for any external consumers (analytics
 * pipelines, admin dashboards, email-marketing exports, etc.).
 *
 * Security properties
 * ───────────────────
 * • Only GET (read) requests are accepted — no mutations.
 * • Only the two explicitly listed endpoints are reachable; every other path
 *   returns 403.  There is no dynamic table selection — callers cannot craft
 *   a request that reaches a different table.
 * • Every response is built from hardcoded, parameterized queries.  No raw
 *   SQL is accepted from callers.
 * • All requests (except /health) must present a valid PROXY_API_KEY secret.
 *   The key must be set via `wrangler secret put PROXY_API_KEY`.
 * • Pagination parameters are clamped/coerced so they cannot trigger integer
 *   overflow or negative-offset tricks.
 * • Sensitive tables (users, sessions, auth_tokens, module_completions) are
 *   never exposed.
 */

interface Env {
  DB: D1Database
  /** Set with: wrangler secret put PROXY_API_KEY --config workers/db-proxy/wrangler.toml */
  PROXY_API_KEY: string
}

// ── Allowed external endpoints (allowlist — everything else is 403) ──────────

const ALLOWED_PATHS = new Set(['/subscribers', '/assessment-stats'])

// ── Helpers ──────────────────────────────────────────────────────────────────

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}

function unauthorized(): Response {
  return json({ error: 'Unauthorized' }, 401)
}

function methodNotAllowed(): Response {
  return json({ error: 'Method not allowed. Only GET is accepted.' }, 405)
}

function notFound(): Response {
  return json({ error: 'Not found.' }, 404)
}

function forbidden(allowedPaths: string[]): Response {
  return json(
    { error: `Endpoint not available. Allowed endpoints: ${allowedPaths.join(', ')}` },
    403,
  )
}

/** Constant-time string comparison to prevent timing attacks on the API key. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

function requireApiKey(request: Request, env: Env): Response | null {
  const provided = request.headers.get('X-API-Key') ?? ''
  if (!env.PROXY_API_KEY || !safeEqual(provided, env.PROXY_API_KEY)) {
    return unauthorized()
  }
  return null
}

function clampInt(raw: string | null, defaultVal: number, min: number, max: number): number {
  const parsed = parseInt(raw ?? String(defaultVal), 10)
  if (!Number.isFinite(parsed)) return defaultVal
  return Math.max(min, Math.min(max, parsed))
}

// ── Endpoint handlers ─────────────────────────────────────────────────────────

/**
 * GET /subscribers
 *
 * Returns confirmed, active subscribers for email-marketing export.
 * Columns exposed: email, subscribed_at
 * Columns hidden:  id, confirm_token, unsubscribe_token
 *
 * Query params:
 *   limit  — rows per page (1–500, default 100)
 *   offset — zero-based row offset (default 0)
 */
async function handleSubscribers(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const limit = clampInt(url.searchParams.get('limit'), 100, 1, 500)
  const offset = clampInt(url.searchParams.get('offset'), 0, 0, Number.MAX_SAFE_INTEGER)

  const [rows, countRow] = await Promise.all([
    env.DB.prepare(
      `SELECT email, subscribed_at
       FROM subscribers
       WHERE confirmed = 1 AND unsubscribed_at IS NULL
       ORDER BY subscribed_at DESC
       LIMIT ? OFFSET ?`,
    )
      .bind(limit, offset)
      .all<{ email: string; subscribed_at: number }>(),

    env.DB.prepare(
      `SELECT COUNT(*) AS count
       FROM subscribers
       WHERE confirmed = 1 AND unsubscribed_at IS NULL`,
    ).first<{ count: number }>(),
  ])

  return json({
    data: rows.results,
    total: countRow?.count ?? 0,
    limit,
    offset,
  })
}

/**
 * GET /assessment-stats
 *
 * Returns aggregated assessment outcomes — no user IDs, no PII.
 * Useful for analytics dashboards or product metrics.
 */
async function handleAssessmentStats(env: Env): Promise<Response> {
  const rows = await env.DB.prepare(
    `SELECT recommended_track, COUNT(*) AS count
     FROM assessment_results
     GROUP BY recommended_track
     ORDER BY count DESC`,
  ).all<{ recommended_track: string; count: number }>()

  return json({ data: rows.results })
}

// ── Entry point ───────────────────────────────────────────────────────────────

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname

    // Health check — unauthenticated, intentionally reveals nothing
    if (path === '/health') {
      return json({ ok: true })
    }

    // All data endpoints require a valid API key
    const authError = requireApiKey(request, env)
    if (authError) return authError

    // Only GET is supported — block any mutation attempts
    if (request.method !== 'GET') return methodNotAllowed()

    // Enforce the allowlist — 403 for anything not explicitly permitted
    if (!ALLOWED_PATHS.has(path)) return forbidden([...ALLOWED_PATHS])

    if (path === '/subscribers') return handleSubscribers(request, env)
    if (path === '/assessment-stats') return handleAssessmentStats(env)

    return notFound()
  },
}
