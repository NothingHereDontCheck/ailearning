'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { roadmapPhases } from '@/lib/roadmap-data'
import type { RoadmapModule, RoadmapPhase, Difficulty } from '@/lib/roadmap-data'
import type { Persona } from '@/types'

const tagColorMap: Record<string, string> = {
  accent:  'bg-[rgba(200,64,26,0.07)]  border-[rgba(200,64,26,0.2)]  text-accent',
  blue:    'bg-[rgba(26,108,200,0.07)] border-[rgba(26,108,200,0.2)] text-accent2',
  green:   'bg-[rgba(26,140,90,0.07)]  border-[rgba(26,140,90,0.2)]  text-accent3',
  gold:    'bg-[rgba(200,150,26,0.07)] border-[rgba(200,150,26,0.2)] text-gold',
  default: 'bg-bg2 border-border text-muted',
}

const difficultyConfig: Record<Difficulty, { label: string; cls: string }> = {
  beginner:     { label: 'Beginner',     cls: tagColorMap.accent },
  intermediate: { label: 'Intermediate', cls: tagColorMap.blue   },
  advanced:     { label: 'Advanced',     cls: 'bg-[rgba(140,26,200,0.07)] border-[rgba(140,26,200,0.2)] text-accent4' },
}

function ModuleCard({
  module,
  locked,
  position,
}: {
  module: RoadmapModule
  locked: boolean
  position: number
}) {
  const diff = difficultyConfig[module.difficulty]

  return (
    <div
      className={[
        'relative bg-surface border border-border p-6 flex gap-5 items-start',
        locked
          ? 'opacity-50 cursor-default'
          : 'transition-all duration-200 hover:border-border2 hover:translate-x-1',
      ].join(' ')}
    >
      <div
        className={[
          'flex-shrink-0 w-7 h-7 border-[1.5px] grid place-items-center font-mono text-[11px]',
          locked
            ? 'border-border text-muted bg-bg'
            : 'border-accent text-accent bg-[rgba(200,64,26,0.06)]',
        ].join(' ')}
        aria-hidden="true"
      >
        {locked ? '🔒' : position}
      </div>

      <div
        className="w-10 h-10 grid place-items-center text-[1.3rem] bg-bg2 border border-border flex-shrink-0"
        aria-hidden="true"
      >
        {module.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-1">
          <h4 className="font-sans text-[14px] font-semibold text-ink leading-[1.3]">
            {module.title}
          </h4>
          {module.isPortfolio && (
            <span className="flex-shrink-0 font-mono text-[9px] tracking-[0.1em] uppercase px-1.5 py-0.5 border bg-[rgba(26,140,90,0.07)] border-[rgba(26,140,90,0.2)] text-accent3">
              Portfolio
            </span>
          )}
        </div>
        <p className="text-[12px] text-muted leading-[1.65] mb-3">{module.description}</p>
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className={`font-mono text-[10px] px-2 py-0.5 border ${diff.cls}`}>
            {diff.label}
          </span>
          {module.tags.map((tag) => (
            <span
              key={tag.label}
              className={`font-mono text-[10px] px-2 py-0.5 border ${tagColorMap[tag.color ?? 'default']}`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      <div className="text-right flex-shrink-0 hidden sm:block">
        <strong className="font-mono text-[13px] text-ink2 block">{module.effortLabel}</strong>
        <span className="font-mono text-[10px] text-muted">{module.effortSub}</span>
      </div>
    </div>
  )
}

function PhaseSection({
  phase,
  persona,
  locked,
  isLast,
}: {
  phase: RoadmapPhase
  persona: Persona
  locked: boolean
  isLast: boolean
}) {
  const visibleModules = phase.modules.filter((m: RoadmapModule) =>
    m.personas.includes(persona)
  )
  if (visibleModules.length === 0) return null

  let position = 0

  return (
    <div className="relative grid md:[grid-template-columns:180px_1fr] gap-0">
      {!isLast && (
        <div
          className="hidden md:block absolute left-[178px] top-0 bottom-0 w-[1.5px] bg-border"
          aria-hidden="true"
        />
      )}

      {/* Phase label — desktop */}
      <div className="hidden md:block pt-6 pr-8 text-right relative">
        <div
          className={[
            'absolute -right-[5px] top-7 w-[9px] h-[9px] rounded-full border-2 border-[var(--bg)] z-[2]',
            locked ? 'bg-border2' : 'bg-accent',
          ].join(' ')}
          aria-hidden="true"
        />
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted block mb-1">
          {phase.label}
        </span>
        <span className="font-serif text-[1.1rem] text-ink block leading-[1.2] mb-2">
          {phase.title}
        </span>
        <span className={`font-mono text-[10px] block mb-3 ${locked ? 'text-muted' : 'text-accent'}`}>
          {phase.duration}
        </span>
        {locked ? (
          <span className="inline-block font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 border border-border bg-bg2 text-muted">
            🔒 Locked
          </span>
        ) : (
          <span className="inline-block font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 border bg-[rgba(26,140,90,0.07)] border-[rgba(26,140,90,0.2)] text-accent3">
            ✓ Available
          </span>
        )}
      </div>

      {/* Phase header — mobile */}
      <div className="md:hidden flex items-center gap-3 pt-8 pb-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted block">
            {phase.label}
          </span>
          <span className="font-serif text-[1.1rem] text-ink">{phase.title}</span>
        </div>
        <span className={`font-mono text-[10px] ml-auto ${locked ? 'text-muted' : 'text-accent'}`}>
          {phase.duration}
        </span>
        {locked ? (
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 border border-border bg-bg2 text-muted">
            🔒
          </span>
        ) : (
          <span className="font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 border bg-[rgba(26,140,90,0.07)] border-[rgba(26,140,90,0.2)] text-accent3">
            ✓
          </span>
        )}
      </div>

      {/* Modules */}
      <div className="pt-6 pb-12 flex flex-col gap-3">
        <p className="text-[12px] text-muted mb-2 italic">{phase.subtitle}</p>
        {visibleModules.map((mod: RoadmapModule) => {
          position += 1
          return (
            <ModuleCard key={mod.id} module={mod} locked={locked} position={position} />
          )
        })}
        {locked && (
          <div className="flex items-center justify-between bg-bg2 border border-border px-5 py-3 mt-1">
            <p className="font-mono text-[11px] text-muted">
              Unlocks after completing 80% of Phase {phase.number - 1}
            </p>
            <Link
              href="/login"
              className="font-sans text-[12px] font-semibold text-accent hover:underline flex-shrink-0 ml-4"
            >
              Track progress →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export function RoadmapContent({ initialTrack }: { initialTrack: Persona | null }) {
  const [persona, setPersona] = useState<Persona>(initialTrack ?? 'security-pro')

  useEffect(() => {
    if (initialTrack !== null) {
      setPersona(initialTrack)
      localStorage.setItem('persona', initialTrack)
    } else {
      const saved = localStorage.getItem('persona') as Persona | null
      if (saved === 'security-pro' || saved === 'career-changer') {
        setPersona(saved)
      }
    }
  }, [initialTrack])

  function selectPersona(p: Persona) {
    setPersona(p)
    localStorage.setItem('persona', p)
  }

  const phase1Modules = roadmapPhases[0]?.modules.filter((m) =>
    m.personas.includes(persona)
  ) ?? []

  return (
    <>
      {/* Persona selector */}
      <div className="mb-12">
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted mb-3">
          Viewing roadmap for —
        </p>
        <div className="flex w-fit" role="group" aria-label="Select your track">
          <button
            onClick={() => selectPersona('security-pro')}
            aria-pressed={persona === 'security-pro'}
            className={[
              'px-5 py-3 border font-sans text-[13px] font-medium cursor-pointer transition-all duration-150 border-r-0',
              persona === 'security-pro'
                ? 'bg-ink text-white border-ink'
                : 'bg-surface border-border text-muted hover:bg-bg2 hover:text-ink',
            ].join(' ')}
          >
            🛡️ Security Pro
            <span className="hidden sm:inline font-mono text-[10px] opacity-60 ml-2">3–5 months</span>
          </button>
          <button
            onClick={() => selectPersona('career-changer')}
            aria-pressed={persona === 'career-changer'}
            className={[
              'px-5 py-3 border font-sans text-[13px] font-medium cursor-pointer transition-all duration-150',
              persona === 'career-changer'
                ? 'bg-ink text-white border-ink'
                : 'bg-surface border-border text-muted hover:bg-bg2 hover:text-ink',
            ].join(' ')}
          >
            🔄 Career Changer
            <span className="hidden sm:inline font-mono text-[10px] opacity-60 ml-2">6–9 months</span>
          </button>
        </div>
        {persona === 'security-pro' && (
          <p className="mt-3 text-[12px] text-muted max-w-[520px]">
            Track A — Phase 1 starts at AI/ML concepts. Security fundamentals are already assumed.{' '}
            <span className="text-ink2">
              Phase 1 has {phase1Modules.length} module{phase1Modules.length !== 1 ? 's' : ''} for your track.
            </span>
          </p>
        )}
        {persona === 'career-changer' && (
          <p className="mt-3 text-[12px] text-muted max-w-[520px]">
            Track B — Phase 1 starts with a skills gap assessment and full AI/ML foundations.
            Your domain expertise becomes an asset in Phase 3.
          </p>
        )}
      </div>

      {/* Timeline */}
      <div className="relative">
        {roadmapPhases.map((phase, i) => (
          <PhaseSection
            key={phase.id}
            phase={phase}
            persona={persona}
            locked={i > 0}
            isLast={i === roadmapPhases.length - 1}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-border pt-10 mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-serif text-[1.1rem] text-ink mb-1">Ready to start?</p>
          <p className="text-[13px] text-muted max-w-[420px]">
            Create a free account to track your progress, unlock phases as you complete them,
            and build a verified portfolio.
          </p>
        </div>
        <Link
          href="/login"
          className="flex-shrink-0 inline-flex items-center bg-accent text-white font-sans font-semibold text-[13px] px-7 py-3 transition-all duration-200 hover:bg-[#a83314] hover:-translate-y-0.5 whitespace-nowrap"
        >
          Create free account →
        </Link>
      </div>
    </>
  )
}
