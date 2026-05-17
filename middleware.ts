import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/auth'

// CVE-2026-23870 body-size guard (keep in sync with next.config.ts serverActions.bodySizeLimit)
const MAX_BODY_BYTES = 128 * 1024 // 128 KB

// ── Internal route-parameter injection guard ─────────────────────────────────
//
// Next.js uses query params prefixed with "nxtP" to thread dynamic route values
// (e.g. [moduleId], [slug]) through its internal render pipeline.  These params
// must never arrive from an external HTTP request: an attacker can supply
// ?nxtPmoduleId=<value> to make the page receive a different route value than
// the path the middleware evaluated, bypassing authorization checks.
//
// We also block the legacy "__next*" internal params that serve a similar role,
// and the "x-middleware-subrequest" header used in a prior middleware-skip CVE.
//
// Reference: Next.js route-parameter normalization bypass advisory.

const BLOCKED_PARAM_PREFIXES = ['nxtP', '__next']
const BLOCKED_HEADERS = ['x-middleware-subrequest', 'x-invoke-path', 'x-invoke-output']

function hasInternalRouteParams(url: URL): boolean {
  for (const key of url.searchParams.keys()) {
    if (BLOCKED_PARAM_PREFIXES.some(prefix => key.startsWith(prefix))) return true
  }
  return false
}

function hasInternalHeaders(request: NextRequest): boolean {
  return BLOCKED_HEADERS.some(h => request.headers.has(h))
}

// ── Middleware ────────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  // 1. Block internal route-parameter injection (auth bypass via nxtP* params)
  const url = new URL(request.url)
  if (hasInternalRouteParams(url) || hasInternalHeaders(request)) {
    return new NextResponse(
      JSON.stringify({ error: 'Bad request.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  // 2. Block oversized POST/PUT/PATCH bodies (DoS via Flight deserializer)
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const contentLength = request.headers.get('content-length')
    if (contentLength !== null) {
      const bytes = parseInt(contentLength, 10)
      if (Number.isFinite(bytes) && bytes > MAX_BODY_BYTES) {
        return new NextResponse(
          JSON.stringify({ error: 'Request body too large.' }),
          { status: 413, headers: { 'Content-Type': 'application/json' } },
        )
      }
    }
  }

  // 3. Auth guard for protected routes
  const { pathname } = request.nextUrl
  const isProtected =
    pathname.startsWith('/dashboard') || pathname.startsWith('/api/progress')

  if (isProtected) {
    const sessionId = request.cookies.get(SESSION_COOKIE)?.value
    if (!sessionId) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  // Run on all routes so guards 1 and 2 are universal.
  // Next.js static assets (_next/static, favicon, etc.) are excluded automatically.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
