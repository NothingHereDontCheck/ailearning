const phases = [
  {
    num: 'Phase 01',
    name: 'Foundation',
    duration: 'Weeks 1–4',
    modules: [
      {
        icon: '🗺️',
        title: 'Skills Gap Assessment',
        desc: 'A guided audit of what you already know vs. what an AI Security Engineer role actually requires. Get a personalized gap report in 20 minutes.',
        tags: [{ label: 'Free', color: 'accent' }, { label: 'Self-assessment' }, { label: '20 min' }],
        effort: 'Start here',
        effortSub: 'First step',
      },
      {
        icon: '🤖',
        title: 'How AI Systems Actually Work',
        desc: 'LLMs, RAG pipelines, AI agents, fine-tuning — explained for people who think in threat models, not math. Enough to know what can go wrong and why.',
        tags: [{ label: 'Beginner', color: 'accent' }, { label: '6 articles' }, { label: '2–3 hrs' }],
        effort: '~3 hrs',
        effortSub: 'self-paced',
      },
      {
        icon: '🧭',
        title: 'The AI Security Landscape',
        desc: "What does an AI Security Engineer actually do? What teams exist? What tools, regulations, and frameworks matter? An honest industry map — no hype.",
        tags: [{ label: 'Beginner', color: 'accent' }, { label: 'Guide + video' }, { label: '1 hr' }],
        effort: '~1 hr',
        effortSub: 'self-paced',
      },
    ],
  },
  {
    num: 'Phase 02',
    name: 'Core Skills',
    duration: 'Weeks 5–10',
    modules: [
      {
        icon: '💉',
        title: 'Prompt Injection & LLM Attack Techniques',
        desc: 'Direct, indirect, multi-turn, and embedding-layer attacks. How they work, how to test for them, and how defenders catch them. Hands-on labs included.',
        tags: [{ label: 'Intermediate', color: 'cyan' }, { label: 'Playbook + Lab' }, { label: 'OWASP LLM Top 10' }],
        effort: '~6 hrs',
        effortSub: 'over 2 weeks',
      },
      {
        icon: '📋',
        title: 'AI Threat Modeling',
        desc: 'STRIDE adapted for AI systems. How to threat-model a RAG pipeline, an AI agent, and a fine-tuned model deployment. Includes templates you can reuse.',
        tags: [{ label: 'Intermediate', color: 'cyan' }, { label: 'Templates' }, { label: 'MITRE ATLAS' }],
        effort: '~4 hrs',
        effortSub: 'self-paced',
      },
      {
        icon: '🔗',
        title: 'ML Supply Chain Security',
        desc: "Model provenance, Hugging Face risks, malicious pickles, data poisoning. The stuff your existing CVE scanner won't catch — and how to build coverage.",
        tags: [{ label: 'Intermediate', color: 'cyan' }, { label: 'Tool walkthroughs' }, { label: 'Detection rules' }],
        effort: '~3 hrs',
        effortSub: 'self-paced',
      },
    ],
  },
  {
    num: 'Phase 03',
    name: 'Applied Practice',
    duration: 'Weeks 11–16',
    modules: [
      {
        icon: '🏗️',
        title: 'Capstone: Audit a Real AI System',
        desc: 'A guided, end-to-end audit of a deliberately vulnerable AI application. You scope it, test it, write findings, and produce a report. This becomes your portfolio piece.',
        tags: [{ label: 'Portfolio Project', color: 'green' }, { label: 'Guided Lab' }, { label: '~12 hrs' }],
        effort: '~12 hrs',
        effortSub: 'capstone',
      },
      {
        icon: '🔧',
        title: 'Build Your AI Security Toolkit',
        desc: 'Curated OSS tools for prompt injection scanning, output monitoring, model behavior testing. Set up a working toolkit you can demo in interviews.',
        tags: [{ label: 'Portfolio Project', color: 'green' }, { label: 'OSS Tools' }, { label: 'GitHub-ready' }],
        effort: '~8 hrs',
        effortSub: 'build project',
      },
    ],
  },
  {
    num: 'Phase 04',
    name: 'Job Ready',
    duration: 'Weeks 17+',
    modules: [
      {
        icon: '📄',
        title: 'Resume & Portfolio for AI Security Roles',
        desc: 'How to frame your background (including non-traditional experience) for AI Security Engineer JDs. Templates, examples, and what ATS actually looks for.',
        tags: [{ label: 'Career', color: 'green' }, { label: 'Templates included' }],
        effort: '~3 hrs',
        effortSub: 'career',
      },
      {
        icon: '🎤',
        title: 'Interview Prep: AI Security Edition',
        desc: 'The 40 most common technical questions, how to answer them from different backgrounds, and how to make your non-traditional path a selling point.',
        tags: [{ label: 'Career', color: 'green' }, { label: 'Question bank' }, { label: 'Mock scenarios' }],
        effort: 'Ongoing',
        effortSub: 'prep resource',
      },
    ],
  },
]

const tagColorMap: Record<string, string> = {
  accent:  'bg-[rgba(129,140,248,0.1)]  border-[rgba(129,140,248,0.25)] text-[var(--accent)]',
  cyan:    'bg-[rgba(34,211,238,0.08)]  border-[rgba(34,211,238,0.2)]  text-[var(--accent2)]',
  green:   'bg-[rgba(52,211,153,0.08)]  border-[rgba(52,211,153,0.2)]  text-[var(--accent3)]',
  default: 'bg-[var(--bg2)] border-[var(--border)] text-[var(--muted)]',
}

export function RoadmapPreview() {
  return (
    <section className="section-wrap" id="roadmap">
      <div className="section-eyebrow">The Curriculum</div>
      <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-[var(--ink)] tracking-[-0.5px] leading-[1.1] mb-3">
        Your phase-by-phase<br /><em className="text-[var(--accent)] not-italic">roadmap.</em>
      </h2>
      <p className="text-[var(--ink2)] max-w-[580px] text-[15px] mb-12">
        No guessing what to learn next. No rabbit holes. A sequenced path from where you are to where you want to be.
      </p>

      <div className="relative">
        {phases.map((phase, pi) => (
          <div key={phase.num} className="relative grid md:[grid-template-columns:180px_1fr] gap-8 mb-0">
            <div className="hidden md:block absolute left-[178px] top-0 bottom-0 w-px bg-[var(--border)]" aria-hidden="true" />

            <div className="pt-6 text-right pr-8 relative hidden md:block">
              <div className="absolute -right-[4px] top-7 w-2 h-2 rounded-full bg-[var(--accent)] border-2 border-[var(--bg)] z-[2]" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--muted)] block mb-1">{phase.num}</span>
              <span className="font-serif text-[1.1rem] text-[var(--ink)] block leading-[1.2] mb-2">{phase.name}</span>
              <span className="font-mono text-[10px] text-[var(--accent)] block">{phase.duration}</span>
            </div>

            <div className="md:hidden flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-[var(--muted)]">{phase.num}</span>
              <span className="font-serif text-[1.1rem] text-[var(--ink)]">{phase.name}</span>
              <span className="font-mono text-[10px] text-[var(--accent)] ml-auto">{phase.duration}</span>
            </div>

            <div className={`pt-6 pb-12 flex flex-col gap-3`}>
              {phase.modules.map((mod) => (
                <div
                  key={mod.title}
                  className="bg-[var(--surface)] border border-[var(--border)] p-6 flex gap-6 items-start transition-all duration-200 hover:border-[var(--border2)] hover:bg-[var(--surface2)] hover:translate-x-1"
                >
                  <div className="w-10 h-10 grid place-items-center text-[1.3rem] bg-[var(--bg2)] border border-[var(--border)] flex-shrink-0" aria-hidden="true">
                    {mod.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-sans text-[14px] font-semibold text-[var(--ink)] mb-1">{mod.title}</h4>
                    <p className="text-[12px] text-[var(--muted)] leading-[1.6] mb-2">{mod.desc}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {mod.tags.map((tag) => (
                        <span key={tag.label} className={`font-mono text-[10px] px-2 py-0.5 border ${tagColorMap[tag.color ?? 'default']}`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-mono text-[10px] text-[var(--muted)] block text-right">
                      <strong className="text-[var(--ink2)] block text-[13px]">{mod.effort}</strong>
                      {mod.effortSub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
