import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import { roadmapPhases } from '@/lib/roadmap-data'
import { getRawLesson } from '@/lib/module-content'
import { extractToc, slugify } from '@/lib/mdx'
import type React from 'react'

export async function generateStaticParams() {
  return roadmapPhases.flatMap((phase) =>
    phase.modules.flatMap((mod) =>
      mod.lessons
        .filter((l) => l.available)
        .map((l) => ({ moduleId: mod.id, lessonSlug: l.slug }))
    )
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string; lessonSlug: string }>
}): Promise<Metadata> {
  const { moduleId, lessonSlug } = await params
  const result = getRawLesson(moduleId, lessonSlug)
  if (!result) return {}
  return { title: result.meta.title, description: result.meta.description }
}

function findModule(moduleId: string) {
  for (const phase of roadmapPhases) {
    const mod = phase.modules.find((m) => m.id === moduleId)
    if (mod) return { mod, phase }
  }
  return null
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

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonSlug: string }>
}) {
  const { moduleId, lessonSlug } = await params

  const found = findModule(moduleId)
  if (!found) notFound()
  const { mod, phase } = found

  const isLocked = phase.number > 1
  if (isLocked) notFound()

  const lessonIndex = mod.lessons.findIndex((l) => l.slug === lessonSlug)
  const lessonMeta = mod.lessons[lessonIndex]
  if (!lessonMeta || !lessonMeta.available) notFound()

  const result = getRawLesson(moduleId, lessonSlug)
  if (!result) notFound()

  const { content: rawContent, meta } = result
  const toc = extractToc(rawContent)

  const { content } = await compileMDX({
    source: rawContent,
    components: mdxComponents,
  })

  const prevLesson = lessonIndex > 0 ? mod.lessons[lessonIndex - 1] : null
  const nextLesson = lessonIndex < mod.lessons.length - 1 ? mod.lessons[lessonIndex + 1] : null

  return (
    <div className="section-wrap">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--muted)] mb-8 flex-wrap">
        <Link href="/roadmap" className="hover:text-[var(--accent)] transition-colors">Roadmap</Link>
        <span>/</span>
        <Link href={`/roadmap/${moduleId}`} className="hover:text-[var(--accent)] transition-colors">{mod.title}</Link>
        <span>/</span>
        <span className="text-[var(--ink2)]">{meta.title}</span>
      </div>

      {/* Lesson header */}
      <div className="max-w-[700px] mb-10">
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--muted)]">{phase.label}</span>
          <span className="font-mono text-[10px] text-[var(--muted)]">
            Lesson {lessonIndex + 1} of {mod.lessons.length}
          </span>
          <span className="font-mono text-[10px] text-[var(--muted)]">{meta.estimatedMinutes} min read</span>
        </div>
        <h1 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] text-[var(--ink)] leading-[1.1] tracking-[-0.5px] mb-4">
          {meta.title}
        </h1>
        {meta.description && (
          <p className="text-[16px] text-[var(--ink2)] leading-[1.75]">{meta.description}</p>
        )}
      </div>

      <hr className="border-t border-[var(--border)] mb-12" />

      <div className="grid lg:grid-cols-[1fr_220px] gap-16 items-start">
        <div>
          <article className="prose">{content}</article>

          {/* Prev / Next */}
          <div className="flex items-center justify-between gap-4 mt-16 pt-8 border-t border-[var(--border)]">
            <div>
              {prevLesson?.available ? (
                <Link
                  href={`/roadmap/${moduleId}/${prevLesson.slug}`}
                  className="group flex flex-col gap-1"
                >
                  <span className="font-mono text-[10px] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">← Previous</span>
                  <span className="text-[13px] font-medium text-[var(--ink2)] group-hover:text-[var(--ink)] transition-colors leading-[1.4]">
                    {prevLesson.title}
                  </span>
                </Link>
              ) : (
                <Link
                  href={`/roadmap/${moduleId}`}
                  className="font-mono text-[11px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  ← Back to module
                </Link>
              )}
            </div>
            <div className="text-right">
              {nextLesson?.available ? (
                <Link
                  href={`/roadmap/${moduleId}/${nextLesson.slug}`}
                  className="group flex flex-col gap-1 items-end"
                >
                  <span className="font-mono text-[10px] text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors">Next →</span>
                  <span className="text-[13px] font-medium text-[var(--ink2)] group-hover:text-[var(--ink)] transition-colors leading-[1.4]">
                    {nextLesson.title}
                  </span>
                </Link>
              ) : (
                <Link
                  href={`/roadmap/${moduleId}`}
                  className="font-mono text-[11px] text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
                >
                  Back to module →
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Table of contents */}
        {toc.length > 0 && (
          <aside className="hidden lg:block sticky top-[80px]" aria-label="Table of contents">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--muted)] mb-4">
              In this lesson
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
            <hr className="border-t border-[var(--border)] mt-8 mb-6" />
            <Link
              href={`/roadmap/${moduleId}`}
              className="text-[12px] font-semibold text-[var(--accent)] hover:underline block mb-2"
            >
              ← All lessons
            </Link>
            <Link
              href="/roadmap"
              className="text-[12px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors block"
            >
              Roadmap overview
            </Link>
          </aside>
        )}
      </div>
    </div>
  )
}
