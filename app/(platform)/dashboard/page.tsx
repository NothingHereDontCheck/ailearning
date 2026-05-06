import type { Metadata } from 'next'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getSessionUser, SESSION_COOKIE } from '@/lib/auth'
import { roadmapPhases } from '@/lib/roadmap-data'
import { MarkCompleteButton } from './MarkCompleteButton'
import type { Persona } from '@/types'

export const metadata: Metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value
  if (!sessionId) redirect('/login')

  const { env } = getCloudflareContext()
  const user = await getSessionUser(env.DB, sessionId)
  if (!user) redirect('/login')

  const completions = await env.DB.prepare(
    'SELECT module_id FROM module_completions WHERE user_id = ? ORDER BY completed_at ASC'
  )
    .bind(user.id)
    .all<{ module_id: string }>()

  const completedIds = new Set(completions.results.map((r: { module_id: string }) => r.module_id))
  const persona: Persona = (user.persona as Persona) ?? 'security-pro'

  const phase1 = roadmapPhases[0]
  const phase1Modules = phase1.modules.filter(m => m.personas.includes(persona))
  const phase1Completed = phase1Modules.filter(m => completedIds.has(m.id)).length
  const phase1Pct =
    phase1Modules.length > 0 ? Math.round((phase1Completed / phase1Modules.length) * 100) : 0

  return (
    <div className="section-wrap">
      <div className="section-eyebrow">Dashboard</div>
      <h1 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] text-[var(--ink)] tracking-[-0.5px] leading-[1.1] mb-2">
        Welcome back.
      </h1>
      <p className="text-[var(--muted)] text-[13px] font-mono mb-10">{user.email}</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        <StatCard label="Modules completed" value={String(completedIds.size)} />
        <StatCard
          label="Current track"
          value={persona === 'security-pro' ? 'Security Pro' : 'Career Changer'}
        />
        <StatCard label="Phase 1 progress" value={`${phase1Pct}%`} />
      </div>

      <div className="border-t border-[var(--border)] pt-8">
        <h2 className="font-serif text-[1.15rem] text-[var(--ink)] mb-4">Phase 1 — {phase1.title}</h2>
        <div className="flex flex-col gap-2 mb-8">
          {phase1Modules.map(mod => (
            <div
              key={mod.id}
              className="flex items-center gap-3 bg-[var(--surface)] border border-[var(--border)] px-4 py-3 transition-colors hover:border-[var(--border2)]"
            >
              <span
                className={[
                  'w-5 h-5 border grid place-items-center font-mono text-[10px] flex-shrink-0',
                  completedIds.has(mod.id)
                    ? 'border-[var(--accent3)] bg-[rgba(52,211,153,0.1)] text-[var(--accent3)]'
                    : 'border-[var(--border)] text-[var(--muted)]',
                ].join(' ')}
                aria-hidden="true"
              >
                {completedIds.has(mod.id) ? '✓' : '○'}
              </span>
              <span className="text-[13px] text-[var(--ink2)] flex-1">{mod.title}</span>
              {!completedIds.has(mod.id) && <MarkCompleteButton moduleId={mod.id} />}
            </div>
          ))}
        </div>

        <Link href={`/roadmap?track=${persona}`} className="btn-primary">
          View full roadmap →
        </Link>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] p-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.04),transparent)] pointer-events-none" />
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--muted)] mb-1">{label}</p>
      <p className="font-serif text-[1.75rem] text-[var(--ink)] leading-[1.1]">{value}</p>
    </div>
  )
}
