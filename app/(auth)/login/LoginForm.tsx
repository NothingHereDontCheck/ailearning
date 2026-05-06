'use client'

import { useState } from 'react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/auth/send-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong.')
        setStatus('error')
      } else {
        setStatus('sent')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="p-6 border border-[rgba(26,140,90,0.3)] bg-[rgba(26,140,90,0.05)]">
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-accent3 mb-2">
          Check your email
        </p>
        <p className="text-[13px] text-ink2">
          We sent a sign-in link to <strong className="text-ink">{email}</strong>. It expires in 15
          minutes.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 font-mono text-[11px] text-muted hover:text-ink underline"
        >
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {status === 'error' && (
        <div className="p-3 border border-[rgba(200,64,26,0.3)] bg-[rgba(200,64,26,0.05)] text-accent text-[12px] font-mono">
          {errorMsg}
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="bg-surface border border-border px-4 py-3 text-[14px] text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-accent text-white font-sans font-semibold text-[13px] px-7 py-3 transition-all duration-200 hover:bg-[#a83314] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Sending...' : 'Send sign-in link →'}
      </button>
    </form>
  )
}
