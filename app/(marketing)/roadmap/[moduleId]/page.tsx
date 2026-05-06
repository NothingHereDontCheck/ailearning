import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { roadmapPhases } from '@/lib/roadmap-data'
import { getSessionUser, SESSION_COOKIE } from '@/lib/auth'
import { ModuleCompleteButton } from './ModuleCompleteButton'

export async function generateStaticParams() {
  return roadmapPhases.flatMap((phase) =>
    phase.modules.map((mod) => ({ moduleId: mod.id }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>
}): Promise<Metadata> {
  const { moduleId } = await params
  const mod = roadmapPhases.flatMap((p) => p.modules).find((m) => m.id === moduleId)
  if (!mod) return {}
  return { title: mod.title, description: mod.description }
}

function findModule(moduleId: string) {
  for (const phase of roadmapPhases) {
    const mod = phase.modules.find((m) => m.id === moduleId)
    if (mod) return { mod, phase }
  }
  return null
}

const difficultyLabel: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const difficultyStyle: Record<string, string> = {
  beginner:     'bg-[rgba(129,140,248,0.1)]  border-[rgba(129,140,248,0.25)] text-[var(--accent)]',
  intermediate: 'bg-[rgba(34,211,238,0.08)]  border-[rgba(34,211,238,0.2)]  text-[var(--accent2)]',
  advanced:     'bg-[rgba(192,132,252,0.08)] border-[rgba(192,132,252,0.2)] text-[var(--accent4)]',
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>
}) {
  const { moduleId } = await params
  const found = findModule(moduleId)
  if (!found) notFound()

  const { mod, phase } = found
  const isLocked = phase.number > 1

  let isComplete = false
  let isSignedIn = false

  if (!isLocked) {
    try {
      const cookieStore = await cookies()
      const sessionId = cookieStore.get(SESSION_COOKIE)?.value
      if (sessionId) {
        const { env } = getCloudflareContext()
        const user = await getSessionUser(env.DB, sessionId)
        if (user) {
          isSignedIn = true
          const row = await env.DB.prepare(
            'SELECT 1 FROM module_completions WHERE user_id = ? AND module_id = ?'
          ).bind(user.id, moduleId).first()
          isComplete = row !== null
        }
      }
    } catch {
      // Not in Cloudflare context (local dev) — skip auth
    }
  }

  return (
    <div className="section-wrap max-w-[760px]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--muted)] mb-8">
        <Link href="/roadmap" className="hover:text-[var(--accent)] transition-colors">Roadmap</Link>
        <span>/</span>
        <span className="text-[var(--ink2)]">{phase.title}</span>
        <span>/</span>
        <span className="text-[var(--ink)]">{mod.title}</span>
      </div>

      {/* Module header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 flex-wrap mb-4">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--muted)]">
            {phase.label}
          </span>
          <span className={`font-mono text-[10px] px-2 py-0.5 border ${difficultyStyle[mod.difficulty]}`}>
            {difficultyLabel[mod.difficulty]}
          </span>
          <span className="font-mono text-[11px] text-[var(--muted)]">{mod.effortLabel}</span>
          {isLocked && (
            <span className="font-mono text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 border border-[var(--border)] bg-[var(--bg2)] text-[var(--muted)]">
              🔒 Phase {phase.number} — Locked
            </span>
          )}
        </div>

        <div className="flex items-start gap-4 mb-4">
          <div
            className="flex-shrink-0 w-12 h-12 grid place-items-center text-[1.5rem] bg-[var(--bg2)] border border-[var(--border)]"
            aria-hidden="true"
          >
            {mod.icon}
          </div>
          <div>
            <h1 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] text-[var(--ink)] tracking-[-0.5px] leading-[1.15] mb-2">
              {mod.title}
            </h1>
            <p className="text-[15px] text-[var(--ink2)] leading-[1.7]">{mod.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {mod.tags.map((tag) => (
            <span
              key={tag.label}
              className="font-mono text-[10px] px-2 py-0.5 border bg-[var(--bg2)] border-[var(--border)] text-[var(--muted)]"
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      <hr className="border-t border-[var(--border)] mb-10" />

      {/* Lessons */}
      <div className="mb-12">
        <h2 className="font-mono text-[11px] tracking-[0.15em] uppercase text-[var(--muted)] mb-6">
          {mod.lessons.length > 0
            ? `${mod.lessons.length} lesson${mod.lessons.length !== 1 ? 's' : ''}`
            : 'Content'}
        </h2>

        {mod.lessons.length === 0 ? (
          <div className="bg-[var(--surface)] border border-[var(--border)] px-6 py-8 text-center">
            <p className="text-[13px] text-[var(--muted)]">Content for this module is being developed.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {mod.lessons.map((lesson, i) => {
              const canAccess = lesson.available && !isLocked
              return (
                <div
                  key={lesson.slug}
                  className={[
                    'flex items-center gap-4 px-5 py-4 border',
                    canAccess
                      ? 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border2)] hover:bg-[var(--surface2)] transition-all duration-150'
                      : 'bg-[var(--bg2)] border-[var(--border)] opacity-60',
                  ].join(' ')}
                >
                  <div
                    className={[
                      'flex-shrink-0 w-6 h-6 border grid place-items-center font-mono text-[10px]',
                      canAccess
                        ? 'border-[var(--accent)] text-[var(--accent)] bg-[rgba(129,140,248,0.08)]'
                        : 'border-[var(--border2)] text-[var(--muted)] bg-[var(--bg)]',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {canAccess ? i + 1 : '🔒'}
                  </div>

                  <div className="flex-1 min-w-0">
                    {canAccess ? (
                      <Link
                        href={`/roadmap/${moduleId}/${lesson.slug}`}
                        className="font-sans text-[14px] font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors leading-[1.4]"
                      >
                        {lesson.title}
                      </Link>
                    ) : (
                      <span className="font-sans text-[14px] font-medium text-[var(--muted)] leading-[1.4]">
                        {lesson.title}
                      </span>
                    )}
                  </div>

                  <div className="flex-shrink-0 text-right">
                    {canAccess ? (
                      <span className="font-mono text-[11px] text-[var(--muted)]">{lesson.estimatedMinutes} min</span>
                    ) : (
                      <span className="font-mono text-[10px] text-[var(--muted)] tracking-[0.1em] uppercase">
                        {isLocked ? 'Locked' : 'Coming soon'}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Progress CTA */}
      {isLocked ? (
        <div className="bg-[var(--bg2)] border border-[var(--border)] px-6 py-5">
          <p className="font-mono text-[11px] text-[var(--muted)] mb-1">
            Phase {phase.number} unlocks after completing 80% of Phase {phase.number - 1}.
          </p>
          <Link href="/roadmap" className="font-mono text-[12px] text-[var(--accent)] hover:underline">
            View your current phase →
          </Link>
        </div>
      ) : isSignedIn ? (
        <ModuleCompleteButton moduleId={moduleId} isComplete={isComplete} />
      ) : (
        <div className="flex items-center gap-4">
          <Link href="/login" className="btn-primary">
            Sign in to track progress →
          </Link>
          <span className="text-[13px] text-[var(--muted)]">Free account, no credit card</span>
        </div>
      )}
    </div>
  )
}
