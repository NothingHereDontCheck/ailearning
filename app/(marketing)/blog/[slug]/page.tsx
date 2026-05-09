import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import { getAllPosts, getRawPost, extractToc, slugify } from '@/lib/mdx'
import type React from 'react'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const result = getRawPost(slug)
  if (!result) return {}
  return { title: result.meta.title, description: result.meta.description }
}

const personaLabels: Record<string, string> = {
  all: 'For Everyone',
  'security-pro': 'Security Pros',
  'career-changer': 'Career Changers',
}

const personaStyles: Record<string, string> = {
  all:              'bg-[rgba(52,211,153,0.08)]  border-[rgba(52,211,153,0.2)]  text-[var(--accent3)]',
  'security-pro':   'bg-[rgba(129,140,248,0.1)]  border-[rgba(129,140,248,0.25)] text-[var(--accent)]',
  'career-changer': 'bg-[rgba(34,211,238,0.08)]  border-[rgba(34,211,238,0.2)]  text-[var(--accent2)]',
}

type HeadingProps = React.ComponentPropsWithoutRef<'h2'>

function makeHeading(Tag: 'h2' | 'h3') {
  return function Heading({ children, ...props }: HeadingProps) {
    const id = typeof children === 'string' ? slugify(children) : undefined
    return <Tag id={id} {...props}>{children}</Tag>
  }
}

const mdxComponents = {
  h2: makeHeading('h2'),
  h3: makeHeading('h3'),
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const result = getRawPost(slug)
  if (!result) notFound()

  const { meta, content: rawContent } = result
  const toc = extractToc(rawContent)

  return (
    <div className="section-wrap">
      <div className="max-w-[700px] mb-10">
        <div className="flex items-center gap-3 flex-wrap mb-5">
          <span className={`font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border ${personaStyles[meta.persona] ?? ''}`}>
            {personaLabels[meta.persona] ?? meta.persona}
          </span>
          <span className="font-mono text-[10px] text-[var(--muted)]">{meta.readingTime} min read</span>
          <span className="font-mono text-[10px] text-[var(--muted)]">
            {new Date(meta.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <h1 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] text-[var(--ink)] leading-[1.1] tracking-[-0.5px] mb-4">
          {meta.title}
        </h1>
        <p className="text-[16px] text-[var(--ink2)] leading-[1.75]">{meta.description}</p>
      </div>

      <hr className="divider mb-12" />

      <div className="grid lg:grid-cols-[1fr_220px] gap-16 items-start">
        <article className="prose">
          <ReactMarkdown components={mdxComponents}>{rawContent}</ReactMarkdown>
        </article>

        {toc.length > 0 && (
          <aside className="hidden lg:block sticky top-[80px]" aria-label="Table of contents">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--muted)] mb-4">
              Contents
            </div>
            <nav>
              <ul className="flex flex-col gap-2">
                {toc.map((entry) => (
                  <li key={entry.id} className={entry.level === 3 ? 'pl-3' : ''}>
                    <a
                      href={`#${entry.id}`}
                      className="text-[12px] text-[var(--muted)] leading-[1.5] hover:text-[var(--accent)] transition-colors duration-150 block"
                    >
                      {entry.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <hr className="divider mt-8 mb-6" />
            <Link href="/blog" className="text-[12px] font-semibold text-[var(--accent)] hover:underline">
              ← All posts
            </Link>
          </aside>
        )}
      </div>
    </div>
  )
}
