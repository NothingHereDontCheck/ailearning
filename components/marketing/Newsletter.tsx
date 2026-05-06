'use client'

import { useState } from 'react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        const data = await res.json() as { error?: string }
        setErrorMsg(data.error ?? 'Something went wrong. Try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error. Try again.')
      setStatus('error')
    }
  }

  return (
    <div className="relative py-20 px-10 overflow-hidden text-center border-t border-b border-[var(--border)] z-[1]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(129,140,248,0.06)_0%,transparent_70%)] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-[var(--bg2)] opacity-60 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 justify-center font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--muted)] mb-2">
          <span className="text-[var(--accent)] text-[13px]">§</span>
          The Field Dispatch
        </div>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-[var(--ink)] tracking-[-0.5px] leading-[1.1] mb-2">
          Stay on the path.
        </h2>
        <p className="text-[var(--muted)] mb-10 max-w-[480px] mx-auto">
          Every week: one concept explained, one skill to practice, one career move to make. Designed for people actively making the transition — not just thinking about it.
        </p>

        {status === 'success' ? (
          <div className="max-w-[460px] mx-auto p-4 border border-[rgba(52,211,153,0.25)] bg-[rgba(52,211,153,0.08)] text-[var(--accent3)] font-mono text-[13px]">
            Check your inbox — confirmation email sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex max-w-[460px] mx-auto" noValidate>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-[var(--surface)] border border-[var(--border2)] border-r-0 text-[var(--ink)] font-sans text-[13px] px-4 py-3 outline-none transition-colors duration-200 focus:border-[var(--accent)] placeholder:text-[var(--muted)]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary text-[12px] px-5 py-3 whitespace-nowrap tracking-[0.03em] disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending…' : 'Join the Dispatch'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-[12px] text-red-400" role="alert">{errorMsg}</p>
        )}

        <div className="flex justify-center gap-8 flex-wrap mt-6">
          {['Free forever', 'No sponsored content', 'Weekly, not daily', 'Unsubscribe anytime'].map((perk) => (
            <span
              key={perk}
              className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--muted)] flex items-center gap-1.5"
            >
              <span className="text-[var(--accent3)]">✓</span>
              {perk}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
