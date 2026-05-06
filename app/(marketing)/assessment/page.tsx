import type { Metadata } from 'next'
import { AssessmentClient } from './AssessmentClient'

export const metadata: Metadata = {
  title: 'Skills Gap Assessment',
  description: 'A 15-question assessment that maps your existing skills to AI Security Engineering requirements and recommends your learning track.',
}

export default function AssessmentPage() {
  return (
    <div className="section-wrap max-w-[760px]">
      <div className="section-eyebrow">Phase 1 — Free</div>
      <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] text-[var(--ink)] tracking-[-0.5px] leading-[1.1] mb-3">
        Skills Gap<br />
        <em className="text-[var(--accent)] not-italic">Assessment.</em>
      </h1>
      <p className="text-[var(--ink2)] max-w-[540px] text-[15px] mb-3">
        15 questions across three areas: Security Fundamentals, AI & ML Systems, and Risk & Governance. Takes about 5 minutes. No login required.
      </p>
      <p className="text-[var(--muted)] text-[13px] mb-10">
        Your results recommend a learning track and identify your strongest and weakest areas going into AI Security Engineering.
      </p>

      <AssessmentClient />
    </div>
  )
}
