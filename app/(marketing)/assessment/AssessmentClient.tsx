'use client'

import Link from 'next/link'
import { useState } from 'react'
import { questions, categories, calculateResult } from '@/lib/assessment-data'
import type { AssessmentResult, Category } from '@/lib/assessment-data'

const categoryOrder: Category[] = ['security', 'ai-ml', 'risk']

const trackCopy = {
  'security-pro': {
    label: 'Track A — Security Pro',
    headline: 'Start at AI/ML concepts.',
    body: 'Your security fundamentals are strong. You don\'t need a basics refresher — you need a bridge into AI systems. Track A skips the security primer and drops you straight into LLM attack surfaces, AI audit methodology, and agent security.',
    color: 'var(--accent)',
    href: '/roadmap?track=security-pro',
  },
  'career-changer': {
    label: 'Track B — Career Changer',
    headline: 'Start with the full foundation.',
    body: 'Your domain expertise is a genuine asset in AI security — but we\'ll build your technical foundation first. Track B covers security fundamentals, AI/ML concepts, and turns your background into a competitive advantage by Phase 3.',
    color: 'var(--accent2)',
    href: '/roadmap?track=career-changer',
  },
}

export function AssessmentClient() {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const answeredCount = Object.keys(answers).length
  const totalQuestions = questions.length
  const allAnswered = answeredCount === totalQuestions

  function handleSelect(questionId: string, value: number) {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  async function handleSubmit() {
    if (!allAnswered) return
    setSubmitting(true)
    setError('')

    const computed = calculateResult(answers)

    try {
      await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
    } catch {
      // Save failure is non-blocking — show results anyway
    }

    setResult(computed)
    setSubmitting(false)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  if (result) {
    const track = trackCopy[result.recommendedTrack]
    return (
      <div>
        {/* Recommended track */}
        <div className="bg-[var(--surface)] border border-[var(--border2)] p-8 mb-8 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at top left, ${track.color}18, transparent 60%)` }}
            aria-hidden="true"
          />
          <div className="relative z-[1]">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase mb-2" style={{ color: track.color }}>
              Recommended
            </div>
            <h2 className="font-serif text-[1.5rem] text-[var(--ink)] mb-1">{track.label}</h2>
            <p className="font-semibold text-[var(--ink)] text-[14px] mb-2">{track.headline}</p>
            <p className="text-[13px] text-[var(--ink2)] leading-[1.7] mb-6 max-w-[560px]">{track.body}</p>
            <Link href={track.href} className="btn-primary">
              View my roadmap →
            </Link>
          </div>
        </div>

        {/* Score bars */}
        <h3 className="font-serif text-[1.1rem] text-[var(--ink)] mb-5">Your scores by category</h3>
        <div className="flex flex-col gap-5 mb-10">
          {categoryOrder.map(cat => {
            const meta = categories[cat]
            const pct = result.percentages[cat]
            return (
              <div key={cat}>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <span className="text-[13px] font-semibold text-[var(--ink)]">{meta.label}</span>
                    <span className="font-mono text-[10px] text-[var(--muted)] ml-2">{meta.description}</span>
                  </div>
                  <span className="font-mono text-[13px] font-semibold" style={{ color: meta.color }}>
                    {pct}%
                  </span>
                </div>
                <div className="h-2 bg-[var(--bg2)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: meta.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Overall */}
        <div className="bg-[var(--bg2)] border border-[var(--border)] px-6 py-4 flex items-center justify-between mb-8">
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)]">Overall score</span>
          <span className="font-serif text-[2rem] text-[var(--ink)]">{result.totalPct}%</span>
        </div>

        <button
          onClick={() => { setResult(null); setAnswers({}) }}
          className="font-mono text-[11px] text-[var(--muted)] hover:text-[var(--ink)] underline"
        >
          Retake assessment
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] text-[var(--muted)]">
            {answeredCount} of {totalQuestions} answered
          </span>
          <span className="font-mono text-[11px] text-[var(--muted)]">
            {Math.round((answeredCount / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-1 bg-[var(--bg2)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Questions grouped by category */}
      {categoryOrder.map(cat => {
        const meta = categories[cat]
        const catQuestions = questions.filter(q => q.category === cat)
        return (
          <div key={cat} className="mb-10">
            <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[var(--border)]">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: meta.color }} aria-hidden="true" />
              <div>
                <h3 className="font-sans text-[13px] font-semibold text-[var(--ink)]">{meta.label}</h3>
                <p className="font-mono text-[10px] text-[var(--muted)]">{meta.description}</p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {catQuestions.map((q, qi) => (
                <div key={q.id} className="bg-[var(--surface)] border border-[var(--border)] p-5">
                  <p className="text-[14px] text-[var(--ink)] font-medium leading-[1.5] mb-4">
                    <span className="font-mono text-[10px] text-[var(--muted)] mr-2">
                      {catQuestions.indexOf(q) + 1}.
                    </span>
                    {q.text}
                  </p>
                  <div className="flex flex-col gap-2">
                    {q.options.map(opt => {
                      const selected = answers[q.id] === opt.value
                      return (
                        <label
                          key={opt.value}
                          className={[
                            'flex items-start gap-3 px-4 py-3 border cursor-pointer transition-all duration-150',
                            selected
                              ? 'border-[var(--accent)] bg-[rgba(129,140,248,0.08)] text-[var(--ink)]'
                              : 'border-[var(--border)] hover:border-[var(--border2)] hover:bg-[var(--surface2)] text-[var(--ink2)]',
                          ].join(' ')}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={opt.value}
                            checked={selected}
                            onChange={() => handleSelect(q.id, opt.value)}
                            className="sr-only"
                          />
                          <span
                            className={[
                              'w-4 h-4 border rounded-full flex-shrink-0 mt-0.5 grid place-items-center',
                              selected
                                ? 'border-[var(--accent)] bg-[var(--accent)]'
                                : 'border-[var(--border2)]',
                            ].join(' ')}
                            aria-hidden="true"
                          >
                            {selected && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                          </span>
                          <span className="text-[13px] leading-[1.5]">{opt.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {error && (
        <p className="text-red-400 text-[13px] mb-4">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!allAnswered || submitting}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
      >
        {submitting ? 'Calculating...' : allAnswered ? 'See my results →' : `Answer all ${totalQuestions - answeredCount} remaining questions`}
      </button>
    </div>
  )
}
