'use client'

import Link from 'next/link'
import { useState } from 'react'

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[900] flex items-center justify-between px-10 h-[60px] bg-[rgba(245,240,232,0.95)] backdrop-blur-[10px] border-b border-[var(--border)]"
      aria-label="Main navigation"
    >
      <Link href="/" className="flex items-center gap-2.5 font-serif text-[1.15rem] text-ink tracking-[-0.3px]">
        <span
          className="w-7 h-7 border-2 border-accent grid place-items-center font-mono text-[11px] text-accent font-medium flex-shrink-0"
          aria-hidden="true"
        >
          AI
        </span>
        AITrustAudit
      </Link>

      <div className="hidden md:flex gap-8" role="list">
        {[
          { href: '/#tracks', label: 'Your Track' },
          { href: '/roadmap', label: 'Roadmap' },
          { href: '/#content', label: 'Resources' },
          { href: '/#outcomes', label: 'Outcomes' },
          { href: '/blog', label: 'Blog' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="relative text-[13px] font-medium text-muted tracking-[0.02em] transition-colors duration-200 hover:text-ink group"
            role="listitem"
          >
            {label}
            <span
              className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-accent scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>

      <Link
        href="/roadmap"
        className="hidden md:inline-flex items-center bg-accent text-white font-sans font-semibold text-xs px-5 py-2 tracking-[0.05em] transition-all duration-200 hover:bg-[#a83314] hover:-translate-y-px"
      >
        Start Learning →
      </Link>

      <button
        className="md:hidden p-2 text-ink2"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? '✕' : '☰'}
      </button>

      {mobileOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-[var(--bg)] border-b border-[var(--border)] flex flex-col p-6 gap-4 md:hidden z-50">
          {[
            { href: '/#tracks', label: 'Your Track' },
            { href: '/roadmap', label: 'Roadmap' },
            { href: '/#content', label: 'Resources' },
            { href: '/#outcomes', label: 'Outcomes' },
            { href: '/blog', label: 'Blog' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[14px] font-medium text-ink2"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/roadmap"
            className="inline-flex items-center bg-accent text-white font-semibold text-xs px-5 py-3 tracking-[0.05em] w-fit mt-2"
            onClick={() => setMobileOpen(false)}
          >
            Start Learning →
          </Link>
        </div>
      )}
    </nav>
  )
}
