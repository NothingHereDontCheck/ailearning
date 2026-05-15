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
    token = validateToken(rawToken, 'Unsubscribe token')
  } catch (err) {
    if (err instanceof ValidationError) {
      return NextResponse.redirect(new URL('/?newsletter=unsubscribed', request.url))
    }
    throw err
  }

  const { env } = getCloudflareContext()

  await env.DB.prepare(
    'UPDATE subscribers SET unsubscribed_at = unixepoch() WHERE unsubscribe_token = ?'
  )
    .bind(token)
    .run()

  return NextResponse.redirect(new URL('/?newsletter=unsubscribed', request.url))
}
