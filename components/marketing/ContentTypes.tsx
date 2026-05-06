const bentoItems = [
  {
    icon: '🗺️',
    tag: { label: 'Flagship', color: 'accent' },
    title: 'The AI Security Career Roadmap',
    desc: "An interactive, persona-aware roadmap that adapts to your starting point. Track your progress, unlock new content as you advance, and always know what's next. No decision fatigue — just a clear path forward with estimated time per phase.",
    span2: true,
    visual: [
      { label: 'Skills Assessment', done: true },
      { label: 'AI Fundamentals', done: true },
      { label: 'LLM Attack Techniques', now: true },
      { label: 'Threat Modeling' },
      { label: 'Supply Chain Security' },
      { label: 'Capstone Audit Project' },
      { label: 'Interview Prep' },
    ],
  },
  {
    icon: '📖',
    tag: { label: 'Explainers', color: 'cyan' },
    title: 'Plain-Language Concept Library',
    desc: 'Every AI security concept explained without jargon — or with jargon fully defined. Written for the person who Googled "what is a RAG pipeline" 20 minutes ago.',
  },
  {
    icon: '🧪',
    tag: { label: 'Hands-On', color: 'green' },
    title: 'Browser-Based Security Labs',
    desc: 'Practice exploiting and defending intentionally vulnerable AI systems — no install required. Each lab comes with a structured walkthrough and a debrief.',
  },
  {
    icon: '💼',
    tag: { label: 'Career', color: 'gold' },
    title: 'Portfolio Project Guides',
    desc: 'Step-by-step guides for building audit reports, detection tools, and threat models that you can actually show in interviews. Built for GitHub showcase.',
  },
  {
    icon: '🎙️',
    tag: { label: 'Stories', color: 'purple' },
    title: 'Transition Spotlights',
    desc: 'Real interviews with people who made the jump — from nurse to AI risk analyst, from SOC L1 to AI red teamer, from paralegal to AI compliance lead. No survivorship bias sugar-coating.',
  },
  {
    icon: '📅',
    tag: { label: 'Weekly', color: 'default' },
    title: 'The Field Dispatch',
    desc: 'Weekly newsletter: one AI security concept explained, one career move to make, one job posting worth applying to. Curated for people actively transitioning.',
  },
]

const tagColorMap: Record<string, string> = {
  accent:  'bg-[rgba(129,140,248,0.1)]  text-[var(--accent)]  border-[rgba(129,140,248,0.2)]',
  cyan:    'bg-[rgba(34,211,238,0.08)]  text-[var(--accent2)] border-[rgba(34,211,238,0.15)]',
  green:   'bg-[rgba(52,211,153,0.08)]  text-[var(--accent3)] border-[rgba(52,211,153,0.15)]',
  gold:    'bg-[rgba(251,191,36,0.08)]  text-[var(--gold)]    border-[rgba(251,191,36,0.15)]',
  purple:  'bg-[rgba(192,132,252,0.08)] text-[var(--accent4)] border-[rgba(192,132,252,0.15)]',
  default: 'bg-[var(--bg2)] text-[var(--muted)] border-[var(--border)]',
}

export function ContentTypes() {
  return (
    <section className="section-wrap" id="content">
      <div className="section-eyebrow">What&apos;s On the Site</div>
      <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-[var(--ink)] tracking-[-0.5px] leading-[1.1] mb-3">
        Resources built for<br /><em className="text-[var(--accent)] not-italic">real transitions.</em>
      </h2>
      <p className="text-[var(--ink2)] max-w-[580px] text-[15px] mb-12">
        Not a dump of links. Not a YouTube playlist. A coherent library curated for where you&apos;re going.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
        {bentoItems.map((item) => (
          <div
            key={item.title}
            className={[
              'bg-[var(--surface)] p-8 transition-all duration-200 hover:bg-[var(--surface2)]',
              item.span2 ? 'sm:col-span-2 flex gap-8 items-start' : '',
            ].join(' ')}
          >
            <div className={item.span2 ? 'flex-1' : ''}>
              <span className="text-[2rem] mb-4 block" aria-hidden="true">{item.icon}</span>
              <span className={`inline-block font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 mb-3 border ${tagColorMap[item.tag.color]}`}>
                {item.tag.label}
              </span>
              <h3 className="font-serif text-[1.15rem] text-[var(--ink)] mb-2 leading-[1.2]">{item.title}</h3>
              <p className="text-[12px] text-[var(--muted)] leading-[1.65]">{item.desc}</p>
            </div>

            {item.span2 && item.visual && (
              <div className="flex-shrink-0 w-[200px] hidden sm:block" aria-hidden="true">
                <div className="flex flex-col gap-2.5">
                  {item.visual.map((step) => (
                    <div key={step.label} className="flex items-center gap-2.5 text-[11px] text-[var(--muted)]">
                      <div
                        className={[
                          'w-1.5 h-1.5 rounded-full flex-shrink-0',
                          step.done
                            ? 'bg-[var(--accent3)]'
                            : step.now
                            ? 'bg-[var(--accent)] shadow-[0_0_0_3px_rgba(129,140,248,0.2)]'
                            : 'bg-[var(--border2)]',
                        ].join(' ')}
                      />
                      {step.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
