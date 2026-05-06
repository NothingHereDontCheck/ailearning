import type { Metadata } from 'next'
import type { Persona } from '@/types'
import { RoadmapContent } from './RoadmapContent'

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'A phase-by-phase curriculum for becoming an AI Security Engineer. Two tracks: security professionals and career changers. No fluff, no rabbit holes.',
}

export default async function RoadmapPage({
  searchParams,
}: {
  searchParams: Promise<{ track?: string }>
}) {
  const { track } = await searchParams
  const initialTrack: Persona | null =
    track === 'security-pro' || track === 'career-changer' ? track : null

  return (
    <div className="section-wrap">
      <div className="section-eyebrow">The Curriculum</div>
      <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] text-ink tracking-[-0.5px] leading-[1.1] mb-3">
        Your AI Security<br />
        <em className="text-accent not-italic">Roadmap.</em>
      </h1>
      <p className="text-muted max-w-[580px] text-[15px] mb-10">
        Four phases. No guessing what to learn next. No rabbit holes. A
        sequenced path from where you are to hired — with two tracks depending
        on your background.
      </p>

      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-12 pb-10 border-b border-border">
        {[
          { dot: 'bg-accent3', label: 'Phase 1 is available without an account' },
          { dot: 'bg-border2', label: 'Phases 2–4 unlock as you complete each phase' },
          { dot: 'bg-accent3', label: 'Portfolio projects count toward job applications' },
        ].map(({ dot, label }) => (
          <div key={label} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} aria-hidden="true" />
            <span className="font-mono text-[10px] text-muted">{label}</span>
          </div>
        ))}
      </div>

      <RoadmapContent initialTrack={initialTrack} />
    </div>
  )
}
