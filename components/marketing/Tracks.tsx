import Link from 'next/link'

export function Tracks() {
  return (
    <section className="section-wrap" id="tracks">
      <div className="section-eyebrow">Your Starting Point</div>
      <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-ink tracking-[-0.5px] leading-[1.1] mb-3">
        Two tracks.<br /><em className="text-accent not-italic">One destination.</em>
      </h2>
      <p className="text-muted max-w-[580px] text-[15px] mb-12">
        Where you&apos;re coming from determines where you start — not where you end up. Pick your track and the roadmap adapts to your existing skills.
      </p>

      <div
        className="grid md:grid-cols-2 gap-[1.5px] bg-border border-[1.5px] border-border mb-12"
        role="list"
        aria-label="Learning tracks"
      >
        {/* Track A */}
        <div
          className="relative bg-surface p-10 transition-colors duration-200 hover:bg-bg overflow-hidden"
          role="listitem"
          data-label="Track A"
        >
          <span
            className="absolute top-5 right-5 font-mono text-[9px] tracking-[0.15em] uppercase text-muted opacity-50"
            aria-hidden="true"
          >
            Track A
          </span>
          <span className="text-[2.5rem] mb-5 block" aria-hidden="true">🛡️</span>
          <h3 className="font-serif text-[1.5rem] text-ink mb-2 tracking-[-0.3px]">The Security Pro Track</h3>
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted mb-4">
            Coming from: SOC / Pentest / Blue Team / Compliance
          </div>
          <p className="text-[13px] text-muted leading-[1.7] mb-6">
            You already speak threat modeling, CVEs, and incident response. You don&apos;t need a security primer — you need a bridge into AI systems. This track fast-tracks past the basics and drops you straight into LLM attack surfaces, AI-specific audit methodology, and agent security.
          </p>
          <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Skills">
            {['✓ Threat Modeling', '✓ SIEM / Detection', '✓ Vuln Management'].map((s) => (
              <span key={s} className="font-mono text-[10px] tracking-[0.05em] px-2.5 py-1 bg-bg2 border border-border text-ink2">
                {s}
              </span>
            ))}
            {['→ ML Fundamentals', '→ Prompt Injection', '→ AI Audit Frameworks', '→ LLM Red Teaming'].map((s) => (
              <span key={s} className="font-mono text-[10px] tracking-[0.05em] px-2.5 py-1 bg-[rgba(200,64,26,0.07)] border border-[rgba(200,64,26,0.2)] text-accent">
                {s}
              </span>
            ))}
          </div>
          <div className="font-mono text-[11px] text-muted flex items-center gap-2 mb-6">
            Estimated timeline: <strong className="text-accent">3–5 months</strong> to job-ready
          </div>
          <Link
            href="/roadmap?track=security-pro"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent border-b-[1.5px] border-accent pb-0.5 transition-all duration-200 hover:gap-3"
            aria-label="Start Track A — Security Pro"
          >
            Start Track A →
          </Link>
        </div>

        {/* Track B */}
        <div
          className="relative bg-surface p-10 transition-colors duration-200 hover:bg-bg overflow-hidden"
          role="listitem"
          data-label="Track B"
        >
          <span
            className="absolute top-5 right-5 font-mono text-[9px] tracking-[0.15em] uppercase text-muted opacity-50"
            aria-hidden="true"
          >
            Track B
          </span>
          <span className="text-[2.5rem] mb-5 block" aria-hidden="true">🔄</span>
          <h3 className="font-serif text-[1.5rem] text-ink mb-2 tracking-[-0.3px]">The Career Changer Track</h3>
          <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted mb-4">
            Coming from: Non-tech, legal, finance, healthcare, military, ops
          </div>
          <p className="text-[13px] text-muted leading-[1.7] mb-6">
            You bring domain expertise that&apos;s actually rare in AI security — understanding healthcare data sensitivity, financial compliance, or operational risk is something CS grads don&apos;t have. This track builds your technical foundation without assuming anything, then leverages your domain advantage.
          </p>
          <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Skills">
            {['✓ Domain Expertise', '✓ Communication Skills'].map((s) => (
              <span key={s} className="font-mono text-[10px] tracking-[0.05em] px-2.5 py-1 bg-bg2 border border-border text-ink2">
                {s}
              </span>
            ))}
            {['→ Security Fundamentals', '→ How AI Systems Work', '→ Risk Frameworks', '→ AI Governance & Audit', '→ Your Domain + AI Security'].map((s) => (
              <span key={s} className="font-mono text-[10px] tracking-[0.05em] px-2.5 py-1 bg-[rgba(200,64,26,0.07)] border border-[rgba(200,64,26,0.2)] text-accent">
                {s}
              </span>
            ))}
          </div>
          <div className="font-mono text-[11px] text-muted flex items-center gap-2 mb-6">
            Estimated timeline: <strong className="text-accent">6–9 months</strong> to job-ready
          </div>
          <Link
            href="/roadmap?track=career-changer"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent border-b-[1.5px] border-accent pb-0.5 transition-all duration-200 hover:gap-3"
            aria-label="Start Track B — Career Changer"
          >
            Start Track B →
          </Link>
        </div>
      </div>
    </section>
  )
}
