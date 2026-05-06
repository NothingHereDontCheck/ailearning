'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { BlogMeta } from '@/lib/mdx'

type Filter = 'all' | 'security-pro' | 'career-changer'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All Posts' },
  { value: 'security-pro', label: 'Security Pros' },
  { value: 'career-changer', label: 'Career Changers' },
]

const personaStyles: Record<BlogMeta['persona'], { cls: string; label: string }> = {
  all:              { cls: 'bg-[rgba(52,211,153,0.08)]  border-[rgba(52,211,153,0.2)]  text-[var(--accent3)]', label: 'Everyone' },
  'security-pro':   { cls: 'bg-[rgba(129,140,248,0.1)]  border-[rgba(129,140,248,0.25)] text-[var(--accent)]',  label: 'Security Pros' },
  'career-changer': { cls: 'bg-[rgba(34,211,238,0.08)]  border-[rgba(34,211,238,0.2)]  text-[var(--accent2)]', label: 'Career Changers' },
}

export function BlogList({ posts }: { posts: BlogMeta[] }) {
  const [active, setActive] = useState<Filter>('all')

  const visible =
    active === 'all' ? posts : posts.filter((p) => p.persona === active || p.persona === 'all')

  const featured = visible.find((p) => p.featured)
  const rest = visible.filter((p) => !p.featured)

  return (
    <>
      <div
        className="flex gap-0 mb-12 border border-[var(--border)] w-fit"
        role="tablist"
        aria-label="Filter posts by audience"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={active === f.value}
            onClick={() => setActive(f.value)}
            className={[
              'px-5 py-2.5 font-mono text-[11px] tracking-[0.1em] uppercase cursor-pointer transition-colors duration-150 border-r border-[var(--border)] last:border-r-0',
              active === f.value
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--ink)]',
            ].join(' ')}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-[var(--muted)] text-[14px]">No posts in this category yet.</p>
      )}

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group block bg-[var(--surface)] border border-[var(--border)] p-8 mb-px transition-all duration-200 hover:bg-[var(--surface2)] hover:border-[var(--border2)]"
          aria-label={`Read featured: ${featured.title}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border bg-[rgba(129,140,248,0.1)] border-[rgba(129,140,248,0.25)] text-[var(--accent)]">
              Featured
            </span>
            <span className={`font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border ${personaStyles[featured.persona].cls}`}>
              {personaStyles[featured.persona].label}
            </span>
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] text-[var(--ink)] leading-[1.2] mb-3 tracking-[-0.3px]">
            {featured.title}
          </h2>
          <p className="text-[14px] text-[var(--ink2)] leading-[1.7] mb-4 max-w-[640px]">
            {featured.description}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-[var(--muted)]">{featured.readingTime} min read</span>
            <span className="font-mono text-[10px] text-[var(--muted)]">
              {new Date(featured.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="text-[13px] font-semibold text-[var(--accent)] ml-auto group-hover:translate-x-0.5 transition-transform">Read →</span>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {rest.map((post) => {
            const ps = personaStyles[post.persona]
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-[var(--surface)] p-7 transition-all duration-200 hover:bg-[var(--surface2)] flex flex-col group"
                aria-label={`Read: ${post.title}`}
              >
                <span className={`font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 inline-block mb-4 border w-fit ${ps.cls}`}>
                  {ps.label}
                </span>
                <h3 className="font-serif text-[1.05rem] text-[var(--ink)] leading-[1.3] mb-2.5 flex-1">
                  {post.title}
                </h3>
                <p className="text-[12px] text-[var(--muted)] leading-[1.6] mb-4">{post.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[var(--muted)]">{post.readingTime} min read</span>
                  <span className="text-[12px] text-[var(--accent)] font-semibold group-hover:translate-x-0.5 transition-transform">Read →</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
