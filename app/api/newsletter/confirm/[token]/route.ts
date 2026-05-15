import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { validateToken, ValidationError } from '@/lib/validation'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token: rawToken } = await params

  let token: string
  try {
    token = validateToken(rawToken, 'Confirmation token')
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.redirect(new URL('/?newsletter=already-confirmed', request.url))
    }
    throw err
  }

  const { env } = getCloudflareContext()

  const row = await env.DB.prepare(
    'SELECT id FROM subscribers WHERE confirm_token = ? AND confirmed = 0'
  )
    .bind(token)
    .first<{ id: string }>()

  if (!row) {
    return NextResponse.redirect(new URL('/?newsletter=already-confirmed', request.url))
  }

  await env.DB.prepare(
    'UPDATE subscribers SET confirmed = 1, confirm_token = NULL WHERE confirm_token = ?'
  )
    .bind(token)
    .run()

  return NextResponse.redirect(new URL('/subscribed', request.url))
}
