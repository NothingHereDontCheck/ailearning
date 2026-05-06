import type { Persona } from '@/types'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type ContentType =
  | 'article'
  | 'lab'
  | 'project'
  | 'assessment'
  | 'guide'
  | 'playbook'

export type RoadmapModule = {
  id: string
  icon: string
  title: string
  description: string
  effortLabel: string
  effortSub: string
  difficulty: Difficulty
  personas: Persona[]
  contentType: ContentType
  tags: Array<{ label: string; color?: string }>
  isPortfolio: boolean
}

export type RoadmapPhase = {
  id: string
  number: number
  label: string
  title: string
  subtitle: string
  duration: string
  modules: RoadmapModule[]
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'phase-1',
    number: 1,
    label: 'Phase 01',
    title: 'Foundation',
    subtitle: 'Build the base layer before you touch anything advanced.',
    duration: 'Weeks 1–4',
    modules: [
      {
        id: 'p1-m1a',
        icon: '🗺️',
        title: 'Skills Gap Assessment',
        description:
          'A guided 20-minute audit of what you already know versus what an AI Security Engineer role requires. Produces a personalized gap report so you know exactly where to focus.',
        effortLabel: '20 min',
        effortSub: 'Start here',
        difficulty: 'beginner',
        personas: ['career-changer'],
        contentType: 'assessment',
        tags: [
          { label: 'Free', color: 'green' },
          { label: 'Self-assessment' },
          { label: 'Track B only', color: 'blue' },
        ],
        isPortfolio: false,
      },
      {
        id: 'p1-m1b',
        icon: '🤖',
        title: 'How AI Systems Actually Work',
        description:
          'LLMs, RAG pipelines, AI agents, fine-tuning — explained for people who think in threat models, not math. Enough to know what can go wrong and why.',
        effortLabel: '~3 hrs',
        effortSub: 'self-paced',
        difficulty: 'beginner',
        personas: ['security-pro', 'career-changer'],
        contentType: 'article',
        tags: [
          { label: 'Beginner', color: 'accent' },
          { label: '6 articles' },
          { label: '2–3 hrs' },
        ],
        isPortfolio: false,
      },
      {
        id: 'p1-m1c',
        icon: '🧭',
        title: 'The AI Security Landscape',
        description:
          "What does an AI Security Engineer actually do? What teams hire them? What tools, regulations, and frameworks matter right now? An honest industry map — no hype, no vendor content.",
        effortLabel: '~1 hr',
        effortSub: 'self-paced',
        difficulty: 'beginner',
        personas: ['security-pro', 'career-changer'],
        contentType: 'guide',
        tags: [
          { label: 'Beginner', color: 'accent' },
          { label: 'Guide + video' },
          { label: '1 hr' },
        ],
        isPortfolio: false,
      },
    ],
  },
  {
    id: 'phase-2',
    number: 2,
    label: 'Phase 02',
    title: 'Core Skills',
    subtitle: 'The technical depth that separates engineers from people who read about AI security.',
    duration: 'Weeks 5–10',
    modules: [
      {
        id: 'p2-m2a',
        icon: '💉',
        title: 'Prompt Injection & LLM Attack Techniques',
        description:
          'Direct, indirect, multi-turn, and embedding-layer attacks. How they work, how to test for them systematically, and how defenders detect them. Hands-on lab against a deliberately vulnerable app.',
        effortLabel: '~6 hrs',
        effortSub: 'over 2 weeks',
        difficulty: 'intermediate',
        personas: ['security-pro', 'career-changer'],
        contentType: 'lab',
        tags: [
          { label: 'Intermediate', color: 'blue' },
          { label: 'Playbook + Lab' },
          { label: 'OWASP LLM Top 10' },
        ],
        isPortfolio: false,
      },
      {
        id: 'p2-m2b',
        icon: '📋',
        title: 'AI Threat Modeling',
        description:
          'STRIDE adapted for AI systems. How to threat-model a RAG pipeline, an AI agent, and a fine-tuned model deployment. Templates you can reuse in real engagements, mapped to MITRE ATLAS.',
        effortLabel: '~4 hrs',
        effortSub: 'self-paced',
        difficulty: 'intermediate',
        personas: ['security-pro', 'career-changer'],
        contentType: 'playbook',
        tags: [
          { label: 'Intermediate', color: 'blue' },
          { label: 'Templates' },
          { label: 'MITRE ATLAS' },
        ],
        isPortfolio: false,
      },
      {
        id: 'p2-m2c',
        icon: '🔗',
        title: 'ML Supply Chain Security',
        description:
          "Model provenance, Hugging Face risks, malicious pickles, data poisoning. The attack surface your existing vulnerability scanner doesn't cover — and how to build detection rules that do.",
        effortLabel: '~3 hrs',
        effortSub: 'self-paced',
        difficulty: 'intermediate',
        personas: ['security-pro', 'career-changer'],
        contentType: 'article',
        tags: [
          { label: 'Intermediate', color: 'blue' },
          { label: 'Tool walkthroughs' },
          { label: 'Detection rules' },
        ],
        isPortfolio: false,
      },
    ],
  },
  {
    id: 'phase-3',
    number: 3,
    label: 'Phase 03',
    title: 'Applied Practice',
    subtitle: 'Portfolio projects that demonstrate real capability — not just completed coursework.',
    duration: 'Weeks 11–16',
    modules: [
      {
        id: 'p3-m3a',
        icon: '🏗️',
        title: 'Capstone: Audit a Real AI System',
        description:
          'A guided, end-to-end security audit of a deliberately vulnerable AI application. You scope it, test it, write findings, and deliver a report. This becomes your primary portfolio artifact.',
        effortLabel: '~12 hrs',
        effortSub: 'capstone',
        difficulty: 'advanced',
        personas: ['security-pro', 'career-changer'],
        contentType: 'lab',
        tags: [
          { label: 'Portfolio Project', color: 'green' },
          { label: 'Guided Lab' },
          { label: '~12 hrs' },
        ],
        isPortfolio: true,
      },
      {
        id: 'p3-m3b',
        icon: '🔧',
        title: 'Build Your AI Security Toolkit',
        description:
          'Curated OSS tools for prompt injection scanning, output monitoring, and model behavior testing. Set up a working toolkit configured for real use, documented and hosted on GitHub.',
        effortLabel: '~8 hrs',
        effortSub: 'build project',
        difficulty: 'advanced',
        personas: ['security-pro', 'career-changer'],
        contentType: 'project',
        tags: [
          { label: 'Portfolio Project', color: 'green' },
          { label: 'OSS Tools' },
          { label: 'GitHub-ready' },
        ],
        isPortfolio: true,
      },
    ],
  },
  {
    id: 'phase-4',
    number: 4,
    label: 'Phase 04',
    title: 'Job Ready',
    subtitle: 'Turn completed work into a job offer.',
    duration: 'Weeks 17+',
    modules: [
      {
        id: 'p4-m4a',
        icon: '📄',
        title: 'Resume & Portfolio for AI Security Roles',
        description:
          "How to frame your background — traditional security, domain expert, or career changer — for AI Security Engineer JDs. Templates, real examples, and what ATS systems actually look for.",
        effortLabel: '~3 hrs',
        effortSub: 'career',
        difficulty: 'beginner',
        personas: ['security-pro', 'career-changer'],
        contentType: 'guide',
        tags: [
          { label: 'Career', color: 'gold' },
          { label: 'Templates included' },
        ],
        isPortfolio: false,
      },
      {
        id: 'p4-m4b',
        icon: '🎤',
        title: 'Interview Prep: AI Security Edition',
        description:
          'The 40 most common technical questions for AI security roles, how to answer them from different backgrounds, and how to make a non-traditional path a competitive advantage rather than a liability.',
        effortLabel: 'Ongoing',
        effortSub: 'prep resource',
        difficulty: 'intermediate',
        personas: ['security-pro', 'career-changer'],
        contentType: 'assessment',
        tags: [
          { label: 'Career', color: 'gold' },
          { label: 'Question bank' },
          { label: 'Mock scenarios' },
        ],
        isPortfolio: false,
      },
    ],
  },
]
