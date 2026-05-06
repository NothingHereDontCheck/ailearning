import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import {
  verifyMagicToken,
  getOrCreateUser,
  createSession,
  SESSION_COOKIE,
  cookieOptions,
} from '@/lib/auth'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/login?error=missing-token', request.url))
  }

  const { env } = getCloudflareContext()

  const email = await verifyMagicToken(env.DB, token)
  if (!email) {
    return NextResponse.redirect(new URL('/login?error=invalid-token', request.url))
  }

  const user = await getOrCreateUser(env.DB, email)
  const sessionId = await createSession(env.DB, user.id)

  const response = NextResponse.redirect(new URL('/dashboard', request.url))
  response.cookies.set(SESSION_COOKIE, sessionId, cookieOptions)
  return response
}
