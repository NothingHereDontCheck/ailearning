import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'AITrustAudit is a structured learning path for security professionals and career changers entering AI Security Engineering.',
}

export default function AboutPage() {
  return (
    <div className="section-wrap max-w-[680px]">
      <div className="mb-12">
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--muted)] block mb-3">About</span>
        <h1 className="font-serif text-[clamp(2rem,5vw,3rem)] text-[var(--ink)] leading-[1.1] tracking-[-0.5px] mb-6">
          Built for people who take this seriously.
        </h1>
        <p className="text-[17px] text-[var(--ink2)] leading-[1.8]">
          AITrustAudit is a structured curriculum for security professionals and career changers who want to move into AI Security Engineering — without the hype, the vendor content, or the 40-hour courses that bury the useful parts.
        </p>
      </div>

      <hr className="border-t border-[var(--border)] mb-12" />

      <div className="space-y-10 text-[15px] text-[var(--ink2)] leading-[1.8]">
        <div>
          <h2 className="font-serif text-[1.3rem] text-[var(--ink)] mb-3">Why this exists</h2>
          <p>
            The AI security field is real, the hiring is accelerating, and the available training is either too shallow or aimed at researchers. Most practitioners are self-teaching from blog posts, conference talks, and frameworks that aren&apos;t fully baked yet.
          </p>
          <p className="mt-4">
            This site is a structured path through that material — organized around what the job actually requires, in the order that makes sense to learn it.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-[1.3rem] text-[var(--ink)] mb-3">Two tracks, one discipline</h2>
          <p>
            <strong className="text-[var(--ink)]">Security Pro (Track A)</strong> — for people who already have a security background. The curriculum assumes you know threat modeling, appsec fundamentals, and how to read a CVE. Phase 1 starts at AI/ML concepts and moves fast.
          </p>
          <p className="mt-4">
            <strong className="text-[var(--ink)]">Career Changer (Track B)</strong> — for people coming from adjacent fields: software engineering, data science, IT. Phase 1 includes a skills gap assessment and full AI/ML foundations before moving into the security layer.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-[1.3rem] text-[var(--ink)] mb-3">What&apos;s free, what isn&apos;t</h2>
          <p>
            Phase 1 is fully free — all lessons, no account required. Creating an account (also free) lets you track progress and mark modules complete. Phases 2–4 unlock as you progress through Phase 1.
          </p>
        </div>
      </div>

      <hr className="border-t border-[var(--border)] my-12" />

      <div className="flex gap-4 flex-wrap">
        <Link href="/roadmap" className="btn-primary">View the roadmap →</Link>
        <Link href="/blog" className="font-sans text-[13px] font-medium text-[var(--muted)] hover:text-[var(--ink)] transition-colors self-center">
          Read the blog
        </Link>
      </div>
    </div>
  )
}
