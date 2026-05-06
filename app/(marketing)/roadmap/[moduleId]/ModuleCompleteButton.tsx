'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function ModuleCompleteButton({ moduleId, isComplete }: { moduleId: string; isComplete: boolean }) {
  const [done, setDone] = useState(isComplete)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleClick() {
    if (done) return
    setLoading(true)
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId }),
    })
    setDone(true)
    setLoading(false)
    router.refresh()
  }

  if (done) {
    return (
      <div className="inline-flex items-center gap-2 font-mono text-[12px] text-[var(--accent3)] border border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.08)] px-4 py-2">
        <span aria-hidden="true">✓</span> Module complete
      </div>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Saving...' : 'Mark module complete →'}
    </button>
  )
}
