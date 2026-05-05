const stats = [
  {
    num: '$',
    highlight: '165',
    suffix: 'k',
    label: 'Median salary for AI Security Engineers in the US',
    source: 'Levels.fyi / LinkedIn, 2025',
  },
  {
    num: '',
    highlight: '3.5',
    suffix: 'M',
    label: 'Unfilled cybersecurity roles globally — AI roles fastest-growing subset',
    source: 'ISC² Workforce Study, 2024',
  },
  {
    num: '',
    highlight: '4×',
    suffix: '',
    label: 'Growth in AI security job postings year-over-year, 2024–2025',
    source: 'Cyberseek / Indeed, 2025',
  },
  {
    num: '',
    highlight: '0',
    suffix: '',
    label: 'Established degree programs in AI Security — the field is building itself from scratch',
    source: 'Translation: self-taught matters here',
  },
]

export function Outcomes() {
  return (
    <section className="section-wrap" id="outcomes">
      <div className="section-eyebrow">Why This Field</div>
      <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-ink tracking-[-0.5px] leading-[1.1] mb-3">
        The numbers make<br /><em className="text-accent not-italic">the case.</em>
      </h2>
      <p className="text-muted max-w-[580px] text-[15px] mb-12">
        AI Security Engineering isn&apos;t a niche. It&apos;s where security is going — and the talent gap means you&apos;re entering a hiring market, not a queue.
      </p>

      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-[1.5px] bg-border border-[1.5px] border-border mb-8"
        role="list"
        aria-label="Industry statistics"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-surface px-7 py-7 text-center transition-colors duration-200 hover:bg-bg"
            role="listitem"
          >
            <span
              className="font-serif text-[2.4rem] text-ink block tracking-[-1px] leading-none mb-1.5"
              aria-hidden="true"
            >
              {stat.num}
              <em className="text-accent not-italic">{stat.highlight}</em>
              {stat.suffix}
            </span>
            <span className="text-[11px] text-muted leading-[1.4] block">{stat.label}</span>
            <span className="font-mono text-[9px] text-border2 mt-1.5 block">{stat.source}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
