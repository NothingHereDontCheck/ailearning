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
    <div className="bg-ink text-white py-16 px-10 relative overflow-hidden text-center">
      {/* Watermark */}
      <span
        className="absolute font-serif text-[12rem] text-white/[0.02] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
        aria-hidden="true"
      >
        AITRUSTAUDIT
      </span>

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 justify-center font-mono text-[10px] tracking-[0.18em] uppercase text-white/40 mb-2">
          <span className="text-accent text-[13px]">§</span>
          The Field Dispatch
        </div>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white tracking-[-0.5px] leading-[1.1] mb-2">
          Stay on the path.
        </h2>
        <p className="text-white/50 mb-10 max-w-[480px] mx-auto">
          Every week: one concept explained, one skill to practice, one career move to make. Designed for people actively making the transition — not just thinking about it.
        </p>

        {status === 'success' ? (
          <div className="max-w-[460px] mx-auto p-4 border border-accent3/30 bg-accent3/10 text-accent3 font-mono text-[13px]">
            Check your inbox — confirmation email sent.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex max-w-[460px] mx-auto"
            noValidate
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/[0.07] border border-white/15 border-r-0 text-white font-sans text-[13px] px-4 py-3 outline-none transition-colors duration-200 focus:border-accent placeholder:text-white/30"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-accent text-white font-sans font-semibold text-[12px] px-5 py-3 border-none cursor-pointer whitespace-nowrap transition-colors duration-200 hover:bg-[#a83314] tracking-[0.03em] disabled:opacity-60"
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
              className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/35 flex items-center gap-1.5"
            >
              <span className="text-accent3">✓</span>
              {perk}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
