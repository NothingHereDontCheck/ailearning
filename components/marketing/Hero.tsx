'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type Persona = 'security-pro' | 'career-changer'

type Step = {
  num: string
  title: string
  desc: string
  tag: string
  tagColor: string
  done?: boolean
  active?: boolean
}

const personaContent: Record<Persona, {
  trackLabel: string
  headline: React.ReactNode
  sub: React.ReactNode
  cta: string
  steps: Step[]
  timeline: string
}> = {
  'security-pro': {
    trackLabel: 'AI Security Engineer — Track A',
    headline: (
      <>
        Break into<br /><em className="text-[var(--accent)] not-italic">AI Security</em><br />Engineering.
      </>
    ),
    sub: (
      <>
        You already speak threat modeling and CVEs. You need a bridge into AI systems — not a security primer.{' '}
        <strong className="text-[var(--ink)] font-semibold">Track A fast-tracks past the basics</strong> and drops you straight
        into LLM attack surfaces, AI audit methodology, and agent security.
      </>
    ),
    cta: 'View Track A Roadmap →',
    steps: [
      { num: '✓', title: 'Security Fundamentals Audit', desc: 'Map your existing skills to AI security needs', tag: 'Completed', tagColor: 'green', done: true },
      { num: '2', title: 'AI/ML Concepts for Security Pros', desc: 'How models work — just enough to break them', tag: 'In Progress', tagColor: 'accent', active: true },
      { num: '3', title: 'LLM Attack Surface & Threat Modeling', desc: 'OWASP LLM Top 10 applied to real systems', tag: 'Up Next', tagColor: 'cyan' },
      { num: '4', title: 'Hands-On: Audit a Production AI System', desc: 'Portfolio-worthy project with guided walkthrough', tag: 'Locked', tagColor: 'cyan' },
      { num: '5', title: 'Job-Ready: Resume, Portfolio & Interview Prep', desc: 'Get hired as an AI Security Engineer', tag: 'Locked', tagColor: 'cyan' },
    ],
    timeline: '3–5 months',
  },
  'career-changer': {
    trackLabel: 'AI Security Engineer — Track B',
    headline: (
      <>
        Change careers.<br />Enter <em className="text-[var(--accent)] not-italic">AI Security</em><br />from anywhere.
      </>
    ),
    sub: (
      <>
        Your domain expertise — healthcare, legal, finance, ops — is{' '}
        <strong className="text-[var(--ink)] font-semibold">genuinely rare in AI security</strong>. Track B builds your
        technical foundation without assuming anything, then turns your background into a competitive advantage.
      </>
    ),
    cta: 'View Track B Roadmap →',
    steps: [
      { num: '1', title: 'Skills Gap Assessment', desc: 'Understand your starting point and gaps', tag: 'Start Here', tagColor: 'accent', active: true },
      { num: '2', title: 'Security Fundamentals', desc: 'The concepts every AI security role assumes you know', tag: 'Up Next', tagColor: 'cyan' },
      { num: '3', title: 'How AI Systems Work', desc: 'LLMs, RAG, agents — explained without the math', tag: 'Locked', tagColor: 'cyan' },
      { num: '4', title: 'LLM Attack Techniques', desc: 'How attackers exploit AI — and how you detect it', tag: 'Locked', tagColor: 'cyan' },
      { num: '5', title: 'Portfolio + Job-Ready', desc: 'Translate your background into hired', tag: 'Locked', tagColor: 'cyan' },
    ],
    timeline: '6–9 months',
  },
}

const tagColorMap: Record<string, string> = {
  green:  'bg-[rgba(52,211,153,0.1)]  text-[var(--accent3)] border-[rgba(52,211,153,0.25)]',
  accent: 'bg-[rgba(129,140,248,0.1)] text-[var(--accent)]  border-[rgba(129,140,248,0.25)]',
  cyan:   'bg-[rgba(34,211,238,0.08)] text-[var(--accent2)] border-[rgba(34,211,238,0.2)]',
}

export function Hero() {
  const [persona, setPersona] = useState<Persona>('security-pro')

  useEffect(() => {
    const saved = localStorage.getItem('persona') as Persona | null
    if (saved === 'security-pro' || saved === 'career-changer') setPersona(saved)
  }, [])

  function selectPersona(p: Persona) {
    setPersona(p)
    localStorage.setItem('persona', p)
  }

  const content = personaContent[persona]

  return (
    <div className="min-h-screen grid md:grid-cols-2 items-center pt-[80px] pb-16 px-10 max-w-[1200px] mx-auto gap-16 relative">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.06)_0%,transparent_65%)]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.04)_0%,transparent_65%)]" />
      </div>

      {/* Left column */}
      <div className="relative z-[2]">
        <div className="inline-flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.15em] uppercase text-[var(--accent)] mb-6 animate-[fadeUp_0.5s_ease_both]">
          <span className="w-7 h-[1px] bg-[var(--accent)] block" aria-hidden="true" />
          Career Roadmap Platform
        </div>

        <h1 className="font-serif text-[clamp(2.6rem,5vw,4.2rem)] text-[var(--ink)] leading-[1.08] tracking-[-1px] mb-6 animate-[fadeUp_0.5s_0.1s_ease_both]">
          {content.headline}
        </h1>

        <p className="text-[16px] text-[var(--ink2)] leading-[1.75] mb-10 max-w-[480px] animate-[fadeUp_0.5s_0.2s_ease_both]">
          {content.sub}
        </p>

        <div className="animate-[fadeUp_0.5s_0.3s_ease_both]">
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--muted)] mb-3">
            I&apos;m coming from —
          </div>

          <div className="flex mb-6" role="group" aria-label="Select your background">
            <button
              onClick={() => selectPersona('security-pro')}
              aria-pressed={persona === 'security-pro'}
              className={[
                'flex-1 px-4 py-3.5 border font-sans text-[13px] font-medium cursor-pointer transition-all duration-200 text-center leading-[1.3] border-r-0',
                persona === 'security-pro'
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--ink)]',
              ].join(' ')}
            >
              <span className="block text-[1.4rem] mb-1" aria-hidden="true">🛡️</span>
              Security
              <span className="text-[11px] opacity-70 block">SOC / Pentest / Blue Team</span>
            </button>
            <button
              onClick={() => selectPersona('career-changer')}
              aria-pressed={persona === 'career-changer'}
              className={[
                'flex-1 px-4 py-3.5 border font-sans text-[13px] font-medium cursor-pointer transition-all duration-200 text-center leading-[1.3]',
                persona === 'career-changer'
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                  : 'bg-[var(--surface)] border-[var(--border)] text-[var(--muted)] hover:bg-[var(--surface2)] hover:text-[var(--ink)]',
              ].join(' ')}
            >
              <span className="block text-[1.4rem] mb-1" aria-hidden="true">🔄</span>
              Career Change
              <span className="text-[11px] opacity-70 block">Non-tech background</span>
            </button>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              href={`/roadmap?track=${persona}`}
              className="btn-primary"
            >
              {content.cta}
            </Link>
            <Link
              href="/#content"
              className="btn-outline"
            >
              See What&apos;s Inside
            </Link>
          </div>
        </div>
      </div>

      {/* Right column — career card */}
      <div className="hidden md:block relative z-[2] animate-[fadeUp_0.5s_0.25s_ease_both]">
        <div className="bg-[var(--surface)] border border-[var(--border2)] shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="bg-[var(--surface2)] border-b border-[var(--border2)] px-5 py-3.5 flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)]">Your path</span>
            <strong className="font-sans text-[13px] font-semibold text-[var(--ink)]">{content.trackLabel}</strong>
          </div>

          <div className="p-5 flex flex-col gap-3">
            {content.steps.map((step, i) => (
              <div key={i} className="flex gap-3.5 items-start">
                <div
                  className={[
                    'w-7 h-7 border grid place-items-center font-mono text-[11px] flex-shrink-0',
                    step.done
                      ? 'bg-[rgba(52,211,153,0.15)] border-[var(--accent3)] text-[var(--accent3)]'
                      : step.active
                      ? 'bg-[rgba(129,140,248,0.15)] border-[var(--accent)] text-[var(--accent)]'
                      : 'bg-[var(--bg2)] border-[var(--border)] text-[var(--muted)]',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {step.num}
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-[var(--ink)] mb-0.5">{step.title}</div>
                  <div className="text-[11px] text-[var(--muted)] leading-[1.5]">{step.desc}</div>
                  <span
                    className={`inline-block font-mono text-[9px] tracking-[0.1em] uppercase px-1.5 py-0.5 mt-1 border ${tagColorMap[step.tagColor] ?? tagColorMap.cyan}`}
                  >
                    {step.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--border)] px-5 py-3 flex items-center justify-between">
            <div className="flex-1 mr-3">
              <div className="font-mono text-[10px] text-[var(--muted)] mb-1">Timeline to job-ready</div>
              <div className="h-1 bg-[var(--bg2)] rounded-full">
                <div className="h-full w-[20%] bg-[var(--accent)] rounded-full transition-all duration-500" />
              </div>
            </div>
            <div className="font-mono text-[12px] text-[var(--accent)] font-medium">{content.timeline}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
