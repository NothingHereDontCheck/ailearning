import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { Resend } from 'resend'
import { createMagicToken, getOrCreateUser } from '@/lib/auth'
import { validateEmail, ValidationError } from '@/lib/validation'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  let normalised: string
  try {
    normalised = validateEmail((body as Record<string, unknown>)?.email)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof ValidationError ? err.message : 'Enter a valid email address.' },
      { status: 400 }
    )
  }

  const { env } = getCloudflareContext()

  await getOrCreateUser(env.DB, normalised)
  const token = await createMagicToken(env.DB, normalised)

  const baseUrl = env.NEXT_PUBLIC_APP_URL || `https://${request.headers.get('host')}`
  const magicLink = `${baseUrl}/api/auth/verify?token=${token}`

  const resend = new Resend(env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: 'AITrustAudit <noreply@aitrustaudit.com>',
    to: normalised,
    subject: 'Your sign-in link for AITrustAudit',
    html: buildEmail(magicLink),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

function buildEmail(link: string): string {
  return `<!DOCTYPE html>
<html><body style="font-family:-apple-system,sans-serif;background:#f5f0e8;color:#1a1610;margin:0;padding:40px 20px;">
  <div style="max-width:480px;margin:0 auto;background:#faf7f2;border:1px solid #d4c9b4;padding:40px;">
    <div style="font-family:monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#8c7e6a;margin-bottom:24px;">AITrustAudit</div>
    <h1 style="font-family:Georgia,serif;font-size:1.5rem;color:#1a1610;margin:0 0 12px;">Your sign-in link</h1>
    <p style="color:#3d3528;font-size:14px;line-height:1.7;margin:0 0 28px;">Click the button below to sign in. This link expires in 15 minutes and can only be used once.</p>
    <a href="${link}" style="display:inline-block;background:#c8401a;color:#ffffff;font-size:13px;font-weight:600;padding:12px 28px;text-decoration:none;">Sign in to AITrustAudit →</a>
    <p style="color:#8c7e6a;font-size:12px;margin-top:28px;">If you didn't request this, you can safely ignore this email.</p>
    <hr style="border:none;border-top:1px solid #d4c9b4;margin:24px 0 16px;">
    <p style="font-family:monospace;font-size:10px;color:#8c7e6a;word-break:break-all;">${link}</p>
  </div>
</body></html>`
}
