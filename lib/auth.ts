import type { D1Database } from '@cloudflare/workers-types'

export const SESSION_COOKIE = 'sid'
const TOKEN_EXPIRY = 15 * 60
const SESSION_EXPIRY = 30 * 24 * 60 * 60

export function generateId(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
}

export async function createMagicToken(db: D1Database, email: string): Promise<string> {
  const token = generateId()
  const expiresAt = Math.floor(Date.now() / 1000) + TOKEN_EXPIRY
  await db
    .prepare('INSERT INTO auth_tokens (id, email, expires_at) VALUES (?, ?, ?)')
    .bind(token, email, expiresAt)
    .run()
  return token
}

export async function verifyMagicToken(db: D1Database, token: string): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000)
  const row = await db
    .prepare('SELECT email, expires_at, used FROM auth_tokens WHERE id = ?')
    .bind(token)
    .first<{ email: string; expires_at: number; used: number }>()
  if (!row || row.used || row.expires_at < now) return null
  await db.prepare('UPDATE auth_tokens SET used = 1 WHERE id = ?').bind(token).run()
  return row.email
}

export async function getOrCreateUser(
  db: D1Database,
  email: string
): Promise<{ id: string; email: string }> {
  const existing = await db
    .prepare('SELECT id, email FROM users WHERE email = ?')
    .bind(email)
    .first<{ id: string; email: string }>()
  if (existing) return existing
  const id = generateId()
  await db.prepare('INSERT INTO users (id, email) VALUES (?, ?)').bind(id, email).run()
  return { id, email }
}

export async function createSession(db: D1Database, userId: string): Promise<string> {
  const sessionId = generateId()
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_EXPIRY
  await db
    .prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)')
    .bind(sessionId, userId, expiresAt)
    .run()
  return sessionId
}

export async function getSessionUser(
  db: D1Database,
  sessionId: string
): Promise<{ id: string; email: string; persona: string | null } | null> {
  const now = Math.floor(Date.now() / 1000)
  const row = await db
    .prepare(
      `SELECT u.id, u.email, u.persona
       FROM sessions s JOIN users u ON s.user_id = u.id
       WHERE s.id = ? AND s.expires_at > ?`
    )
    .bind(sessionId, now)
    .first<{ id: string; email: string; persona: string | null }>()
  return row ?? null
}

export async function deleteSession(db: D1Database, sessionId: string): Promise<void> {
  await db.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run()
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: SESSION_EXPIRY,
}
