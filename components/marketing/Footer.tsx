import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-bg2 border-t border-border px-10 py-10 flex justify-between items-center flex-wrap gap-6">
      <Link href="/" className="flex items-center gap-2.5 font-serif text-[1.05rem] text-ink">
        <span className="w-7 h-7 border-2 border-accent grid place-items-center font-mono text-[11px] text-accent font-medium" aria-hidden="true">
          AI
        </span>
        AITrustAudit.com
      </Link>

      <nav aria-label="Footer navigation">
        <ul className="flex gap-6 flex-wrap list-none">
          {[
            { href: '/about', label: 'About' },
            { href: '/roadmap', label: 'Roadmap' },
            { href: '/blog', label: 'Blog' },
            { href: '/newsletter', label: 'Newsletter' },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-[12px] text-muted transition-colors duration-200 hover:text-accent">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <span className="font-mono text-[10px] text-muted tracking-[0.05em]">
        © 2026 — Built for people who build their own path.
      </span>
    </footer>
  )
}
