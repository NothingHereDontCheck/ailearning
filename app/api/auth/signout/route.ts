import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { deleteSession, SESSION_COOKIE } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE)?.value

  if (sessionId) {
    const { env } = getCloudflareContext()
    await deleteSession(env.DB, sessionId)
  }

  const response = NextResponse.redirect(new URL('/', request.url))
  response.cookies.set(SESSION_COOKIE, '', { maxAge: 0, path: '/' })
  return response
}
