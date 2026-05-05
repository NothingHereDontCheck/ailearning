const bentoItems = [
  {
    icon: '🗺️',
    tag: { label: 'Flagship', color: 'accent' },
    title: 'The AI Security Career Roadmap',
    desc: 'An interactive, persona-aware roadmap that adapts to your starting point. Track your progress, unlock new content as you advance, and always know what\'s next. No decision fatigue — just a clear path forward with estimated time per phase.',
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
    tag: { label: 'Explainers', color: 'blue' },
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
  accent: 'bg-[rgba(200,64,26,0.08)] text-accent border-[rgba(200,64,26,0.15)]',
  blue: 'bg-[rgba(26,108,200,0.08)] text-accent2 border-[rgba(26,108,200,0.15)]',
  green: 'bg-[rgba(26,140,90,0.08)] text-accent3 border-[rgba(26,140,90,0.15)]',
  gold: 'bg-[rgba(200,150,26,0.08)] text-gold border-[rgba(200,150,26,0.15)]',
  purple: 'bg-[rgba(140,26,200,0.08)] text-accent4 border-[rgba(140,26,200,0.15)]',
  default: 'bg-bg2 text-muted border-border',
}

export function ContentTypes() {
  return (
    <section className="section-wrap" id="content">
      <div className="section-eyebrow">What&apos;s On the Site</div>
      <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-ink tracking-[-0.5px] leading-[1.1] mb-3">
        Resources built for<br /><em className="text-accent not-italic">real transitions.</em>
      </h2>
      <p className="text-muted max-w-[580px] text-[15px] mb-12">
        Not a dump of links. Not a YouTube playlist. A coherent library curated for where you&apos;re going.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1.5px] bg-border border-[1.5px] border-border">
        {bentoItems.map((item) => (
          <div
            key={item.title}
            className={[
              'bg-surface p-8 transition-colors duration-200 hover:bg-bg',
              item.span2 ? 'sm:col-span-2 flex gap-8 items-start' : '',
            ].join(' ')}
          >
            <div className={item.span2 ? 'flex-1' : ''}>
              <span className="text-[2rem] mb-4 block" aria-hidden="true">{item.icon}</span>
              <span className={`inline-block font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 mb-3 border ${tagColorMap[item.tag.color]}`}>
                {item.tag.label}
              </span>
              <h3 className="font-serif text-[1.15rem] text-ink mb-2 leading-[1.2]">{item.title}</h3>
              <p className="text-[12px] text-muted leading-[1.65]">{item.desc}</p>
            </div>

            {item.span2 && item.visual && (
              <div className="flex-shrink-0 w-[200px] hidden sm:block" aria-hidden="true">
                <div className="flex flex-col gap-2">
                  {item.visual.map((step) => (
                    <div key={step.label} className="flex items-center gap-2.5 text-[11px] text-muted">
                      <div
                        className={[
                          'w-2 h-2 rounded-full flex-shrink-0',
                          step.done ? 'bg-accent3' : step.now ? 'bg-accent shadow-[0_0_0_3px_rgba(200,64,26,0.15)]' : 'bg-border2',
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
