import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { Resend } from 'resend'
import { generateId } from '@/lib/auth'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const email = (body as Record<string, unknown>)?.email
  if (typeof email !== 'string' || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const { env } = getCloudflareContext()
  const normalised = email.toLowerCase()

  const existing = await env.DB.prepare(
    'SELECT confirmed, unsubscribed_at FROM subscribers WHERE email = ?'
  )
    .bind(normalised)
    .first<{ confirmed: number; unsubscribed_at: number | null }>()

  if (existing?.confirmed && !existing.unsubscribed_at) {
    return NextResponse.json({ ok: true })
  }

  const confirmToken = generateId()
  const unsubToken = generateId()
  const id = generateId()

  if (existing) {
    await env.DB.prepare(
      'UPDATE subscribers SET confirm_token = ?, unsubscribe_token = ?, confirmed = 0, unsubscribed_at = NULL WHERE email = ?'
    )
      .bind(confirmToken, unsubToken, normalised)
      .run()
  } else {
    await env.DB.prepare(
      'INSERT INTO subscribers (id, email, confirm_token, unsubscribe_token) VALUES (?, ?, ?, ?)'
    )
      .bind(id, normalised, confirmToken, unsubToken)
      .run()
  }

  const baseUrl = env.NEXT_PUBLIC_APP_URL || `https://${request.headers.get('host')}`
  const confirmUrl = `${baseUrl}/api/newsletter/confirm/${confirmToken}`
  const unsubUrl = `${baseUrl}/api/newsletter/unsubscribe/${unsubToken}`

  const resend = new Resend(env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: 'AITrustAudit <noreply@aitrustaudit.com>',
    to: email,
    subject: 'Confirm your subscription to The Field Dispatch',
    html: buildConfirmEmail(confirmUrl, unsubUrl),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send confirmation email.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

function buildConfirmEmail(confirmUrl: string, unsubUrl: string): string {
  return `<!DOCTYPE html>
<html><body style="font-family:-apple-system,sans-serif;background:#080c17;color:#e8edf5;margin:0;padding:40px 20px;">
  <div style="max-width:480px;margin:0 auto;background:#111d30;border:1px solid #1e2d42;padding:40px;">
    <div style="font-family:monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#475569;margin-bottom:24px;">The Field Dispatch</div>
    <h1 style="font-family:Georgia,serif;font-size:1.5rem;color:#e8edf5;margin:0 0 12px;">Confirm your subscription</h1>
    <p style="color:#94a3b8;font-size:14px;line-height:1.7;margin:0 0 28px;">One click to confirm. Every week: one concept explained, one skill to practice, one career move to make.</p>
    <a href="${confirmUrl}" style="display:inline-block;background:#6366f1;color:#ffffff;font-size:13px;font-weight:600;padding:12px 28px;text-decoration:none;">Confirm subscription →</a>
    <p style="color:#475569;font-size:12px;margin-top:28px;">If you didn't sign up for this, you can safely ignore this email.</p>
    <hr style="border:none;border-top:1px solid #1e2d42;margin:24px 0 16px;">
    <p style="font-family:monospace;font-size:10px;color:#475569;">
      <a href="${unsubUrl}" style="color:#475569;">Unsubscribe</a>
    </p>
  </div>
</body></html>`
}
