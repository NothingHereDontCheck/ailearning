import Link from 'next/link'
import { cookies } from 'next/headers'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getSessionUser, SESSION_COOKIE } from '@/lib/auth'

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value

  let email: string | null = null
  if (sessionId) {
    const { env } = getCloudflareContext()
    const user = await getSessionUser(env.DB, sessionId)
    email = user?.email ?? null
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-10 h-[60px] bg-[rgba(245,240,232,0.95)] backdrop-blur-[10px] border-b border-[var(--border)]">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-serif text-[1.15rem] text-ink tracking-[-0.3px]"
        >
          <span
            className="w-7 h-7 border-2 border-accent grid place-items-center font-mono text-[11px] text-accent font-medium flex-shrink-0"
            aria-hidden="true"
          >
            AI
          </span>
          AITrustAudit
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/roadmap"
            className="text-[13px] font-medium text-muted hover:text-ink transition-colors hidden sm:block"
          >
            Roadmap
          </Link>
          {email && (
            <span className="font-mono text-[11px] text-muted hidden md:block">{email}</span>
          )}
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="font-mono text-[11px] text-muted hover:text-ink transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </form>
        </div>
      </nav>
      <main className="pt-[60px]">{children}</main>
    </>
  )
}
