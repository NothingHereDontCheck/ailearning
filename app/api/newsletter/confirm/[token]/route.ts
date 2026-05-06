import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
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
