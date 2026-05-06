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
  all: {
    cls: 'bg-[rgba(26,140,90,0.07)] border-[rgba(26,140,90,0.2)] text-accent3',
    label: 'Everyone',
  },
  'security-pro': {
    cls: 'bg-[rgba(200,64,26,0.07)] border-[rgba(200,64,26,0.2)] text-accent',
    label: 'Security Pros',
  },
  'career-changer': {
    cls: 'bg-bg2 border-border text-muted',
    label: 'Career Changers',
  },
}

export function BlogList({ posts }: { posts: BlogMeta[] }) {
  const [active, setActive] = useState<Filter>('all')

  const visible =
    active === 'all'
      ? posts
      : posts.filter((p) => p.persona === active || p.persona === 'all')

  const featured = visible.find((p) => p.featured)
  const rest = visible.filter((p) => !p.featured)

  return (
    <>
      <div
        className="flex gap-0 mb-12 border border-border w-fit"
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
              'px-5 py-2.5 font-mono text-[11px] tracking-[0.1em] uppercase cursor-pointer transition-colors duration-150 border-r border-border last:border-r-0',
              active === f.value
                ? 'bg-ink text-white'
                : 'bg-surface text-muted hover:bg-bg2 hover:text-ink',
            ].join(' ')}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-muted text-[14px]">No posts in this category yet.</p>
      )}

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group block bg-surface border border-border p-8 mb-[1.5px] transition-colors duration-200 hover:bg-bg"
          aria-label={`Read featured: ${featured.title}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border bg-[rgba(200,64,26,0.07)] border-[rgba(200,64,26,0.2)] text-accent">
              Featured
            </span>
            <span className={`font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border ${personaStyles[featured.persona].cls}`}>
              {personaStyles[featured.persona].label}
            </span>
          </div>
          <h2 className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] text-ink leading-[1.2] mb-3 tracking-[-0.3px]">
            {featured.title}
          </h2>
          <p className="text-[14px] text-muted leading-[1.7] mb-4 max-w-[640px]">
            {featured.description}
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-muted">{featured.readingTime} min read</span>
            <span className="font-mono text-[10px] text-muted">
              {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </span>
            <span className="text-[13px] font-semibold text-accent ml-auto">Read →</span>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1.5px] bg-border border border-border">
          {rest.map((post) => {
            const ps = personaStyles[post.persona]
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-surface p-7 transition-colors duration-200 hover:bg-bg flex flex-col group"
                aria-label={`Read: ${post.title}`}
              >
                <span className={`font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 inline-block mb-4 border w-fit ${ps.cls}`}>
                  {ps.label}
                </span>
                <h3 className="font-serif text-[1.05rem] text-ink leading-[1.3] mb-2.5 flex-1">
                  {post.title}
                </h3>
                <p className="text-[12px] text-muted leading-[1.6] mb-4">{post.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-muted">{post.readingTime} min read</span>
                  <span className="text-[12px] text-accent font-semibold">Read →</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
