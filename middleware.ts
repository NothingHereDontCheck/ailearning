import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/auth'

// CVE-2026-23870: crafted POST bodies to React Server Function endpoints can
// cause the Flight deserializer to spin CPU (DoS). Reject anything over this
// limit before the body is read by any handler.  Mirrors the serverActions
// bodySizeLimit set in next.config.ts; keep the two values in sync.
const MAX_BODY_BYTES = 128 * 1024 // 128 KB

export function middleware(request: NextRequest) {
  // Block oversized POST/PUT/PATCH bodies on all routes
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    const contentLength = request.headers.get('content-length')
    if (contentLength !== null) {
      const bytes = parseInt(contentLength, 10)
      if (Number.isFinite(bytes) && bytes > MAX_BODY_BYTES) {
        return new NextResponse(
          JSON.stringify({ error: 'Request body too large.' }),
          { status: 413, headers: { 'Content-Type': 'application/json' } },
        )
      }
    }
  }

  // Auth guard for protected routes
  const { pathname } = request.nextUrl
  const isProtected =
    pathname.startsWith('/dashboard') || pathname.startsWith('/api/progress')

  if (isProtected) {
    const sessionId = request.cookies.get(SESSION_COOKIE)?.value
    if (!sessionId) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  // Run on all routes so the body-size guard is universal.
  // Next.js static assets (_next/static, favicon, etc.) are excluded automatically.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
