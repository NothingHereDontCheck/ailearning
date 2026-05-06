import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'You\'re subscribed',
}

export default function SubscribedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-[480px] text-center">
        <div className="w-14 h-14 mx-auto mb-6 border border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.08)] grid place-items-center text-[var(--accent3)] text-[1.5rem]">
          ✓
        </div>
        <div className="section-eyebrow justify-center mb-4">The Field Dispatch</div>
        <h1 className="font-serif text-[clamp(1.75rem,3vw,2.5rem)] text-[var(--ink)] tracking-[-0.5px] leading-[1.1] mb-3">
          You&apos;re in.
        </h1>
        <p className="text-[var(--ink2)] text-[15px] mb-10 max-w-[380px] mx-auto">
          Every week: one concept explained, one skill to practice, one career move to make. First issue lands in your inbox soon.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/roadmap" className="btn-primary">
            Start the roadmap →
          </Link>
          <Link href="/blog" className="btn-outline">
            Read the blog
          </Link>
        </div>
      </div>
    </div>
  )
}
