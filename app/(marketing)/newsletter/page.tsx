import type { Metadata } from 'next'
import { Newsletter } from '@/components/marketing/Newsletter'

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Get notified when new lessons and modules are published. No filler, no marketing cadence.',
}

export default function NewsletterPage() {
  return (
    <div className="section-wrap max-w-[560px]">
      <div className="mb-10">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--muted)] block mb-3">Newsletter</span>
        <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] text-[var(--ink)] leading-[1.1] tracking-[-0.5px] mb-4">
          Updates when they matter.
        </h1>
        <p className="text-[16px] text-[var(--ink2)] leading-[1.75]">
          Get notified when new lessons and modules are published. No marketing cadence, no filler — only emails worth opening.
        </p>
      </div>

      <hr className="border-t border-[var(--border)] mb-10" />

      <Newsletter />
    </div>
  )
}
