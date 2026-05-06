import { NextRequest, NextResponse } from 'next/server'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null || !('email' in body)) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  }

  const email = (body as { email: unknown }).email
  if (typeof email !== 'string' || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  // TODO: Phase 5 — insert into D1 subscribers table and send confirmation via Resend
  // For now, return success so the form works end-to-end in development
  return NextResponse.json({ ok: true }, { status: 200 })
}
