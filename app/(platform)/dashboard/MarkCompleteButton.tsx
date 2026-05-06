'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function MarkCompleteButton({ moduleId }: { moduleId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleClick() {
    setLoading(true)
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduleId }),
    })
    router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="ml-auto font-mono text-[10px] text-muted hover:text-accent3 border border-border hover:border-accent3 px-2 py-0.5 transition-colors disabled:opacity-50 cursor-pointer"
    >
      {loading ? '...' : 'Mark done'}
    </button>
  )
}
