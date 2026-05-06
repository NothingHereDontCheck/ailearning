import type { Persona } from '@/types'

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type ContentType =
  | 'article'
  | 'lab'
  | 'project'
  | 'assessment'
  | 'guide'
  | 'playbook'

export type Lesson = {
  slug: string
  title: string
  estimatedMinutes: number
  available: boolean
}

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
  lessons: Lesson[]
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
        lessons: [],
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
        lessons: [
          { slug: 'how-llms-work', title: 'How LLMs Work: A Mental Model for Security Engineers', estimatedMinutes: 18, available: true },
          { slug: 'rag-pipelines', title: 'RAG Pipelines: Architecture and Where They Break', estimatedMinutes: 22, available: true },
          { slug: 'ai-agents', title: 'AI Agents: ReAct Loops, Tool Use, and the Attack Surface', estimatedMinutes: 20, available: true },
          { slug: 'fine-tuning', title: 'Fine-Tuning and Model Customization: What Changes', estimatedMinutes: 16, available: true },
          { slug: 'ai-deployment', title: 'How AI Systems Are Deployed: APIs, Inference, and Infrastructure', estimatedMinutes: 18, available: true },
          { slug: 'evaluating-ai', title: 'Evaluating AI Systems: Why Testing AI Isn\'t Like Testing Software', estimatedMinutes: 15, available: true },
        ],
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
        lessons: [
          { slug: 'ai-security-landscape', title: 'The AI Security Landscape: An Honest Industry Map', estimatedMinutes: 40, available: true },
        ],
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
        lessons: [
          { slug: 'direct-prompt-injection', title: 'Direct Prompt Injection: How It Works and How to Test It', estimatedMinutes: 25, available: false },
          { slug: 'indirect-prompt-injection', title: 'Indirect Prompt Injection: Attacking Through Retrieved Context', estimatedMinutes: 22, available: false },
          { slug: 'jailbreaking-techniques', title: 'Jailbreaking Techniques and Why They Work', estimatedMinutes: 20, available: false },
          { slug: 'llm-attack-lab', title: 'Lab: Testing Against a Deliberately Vulnerable LLM App', estimatedMinutes: 90, available: false },
        ],
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
        lessons: [
          { slug: 'stride-for-ai', title: 'STRIDE for AI: Adapting Threat Modeling to LLM Systems', estimatedMinutes: 30, available: false },
          { slug: 'threat-modeling-rag', title: 'Threat Modeling a RAG Pipeline', estimatedMinutes: 25, available: false },
          { slug: 'threat-modeling-agents', title: 'Threat Modeling AI Agents and Multi-Agent Systems', estimatedMinutes: 25, available: false },
          { slug: 'mitre-atlas', title: 'MITRE ATLAS: Mapping AI Threats to the Framework', estimatedMinutes: 20, available: false },
        ],
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
        lessons: [
          { slug: 'model-provenance', title: 'Model Provenance: Where Did That Model Actually Come From?', estimatedMinutes: 20, available: false },
          { slug: 'huggingface-risks', title: 'Hugging Face Risks: Malicious Pickles and Unsafe Deserialisation', estimatedMinutes: 18, available: false },
          { slug: 'data-poisoning', title: 'Data Poisoning: Attacking Models at Training Time', estimatedMinutes: 22, available: false },
        ],
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
        lessons: [
          { slug: 'scoping-the-audit', title: 'Scoping the Audit: Defining Targets, Constraints, and Rules of Engagement', estimatedMinutes: 30, available: false },
          { slug: 'testing-methodology', title: 'Testing Methodology: Systematic Coverage Across the Attack Surface', estimatedMinutes: 45, available: false },
          { slug: 'writing-findings', title: 'Writing Findings: From Raw Notes to a Deliverable Report', estimatedMinutes: 30, available: false },
          { slug: 'capstone-lab', title: 'Lab: Full Audit of VulnAI (Guided)', estimatedMinutes: 360, available: false },
        ],
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
        lessons: [
          { slug: 'oss-tools-overview', title: 'OSS AI Security Tools: What Exists and What Actually Works', estimatedMinutes: 25, available: false },
          { slug: 'build-the-toolkit', title: 'Project: Set Up Your Toolkit and Document It for GitHub', estimatedMinutes: 240, available: false },
        ],
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
        lessons: [
          { slug: 'resume-framing', title: 'Framing Your Background for AI Security JDs', estimatedMinutes: 30, available: false },
          { slug: 'portfolio-structure', title: 'Structuring Your Portfolio: What Hiring Managers Actually Look At', estimatedMinutes: 25, available: false },
          { slug: 'ats-optimization', title: 'ATS Optimization Without Keyword Stuffing', estimatedMinutes: 20, available: false },
        ],
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
        lessons: [
          { slug: 'technical-questions', title: 'The 40 Most Common Technical Questions for AI Security Roles', estimatedMinutes: 60, available: false },
          { slug: 'non-traditional-path', title: 'Making a Non-Traditional Path a Competitive Advantage', estimatedMinutes: 25, available: false },
          { slug: 'mock-scenarios', title: 'Mock Interview Scenarios: Walk-Through and Commentary', estimatedMinutes: 45, available: false },
        ],
      },
    ],
  },
]
