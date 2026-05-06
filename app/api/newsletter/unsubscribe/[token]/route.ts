import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const { env } = getCloudflareContext()

  await env.DB.prepare(
    'UPDATE subscribers SET unsubscribed_at = unixepoch() WHERE unsubscribe_token = ?'
  )
    .bind(token)
    .run()

  return NextResponse.redirect(new URL('/?newsletter=unsubscribed', request.url))
}
