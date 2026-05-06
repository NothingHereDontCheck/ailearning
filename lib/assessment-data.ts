export type Category = 'security' | 'ai-ml' | 'risk'

export interface Question {
  id: string
  category: Category
  text: string
  options: { label: string; value: number }[]
}

export interface AssessmentResult {
  scores: Record<Category, number>
  maxScores: Record<Category, number>
  percentages: Record<Category, number>
  recommendedTrack: 'security-pro' | 'career-changer'
  totalPct: number
}

export const categories: Record<Category, { label: string; description: string; color: string }> = {
  security: {
    label: 'Security Fundamentals',
    description: 'Threat modeling, vulnerability assessment, incident response',
    color: 'var(--accent)',
  },
  'ai-ml': {
    label: 'AI & ML Systems',
    description: 'LLMs, RAG pipelines, AI agents, model deployment',
    color: 'var(--accent2)',
  },
  risk: {
    label: 'Risk & Governance',
    description: 'AI risk frameworks, compliance, regulatory requirements',
    color: 'var(--accent3)',
  },
}

function opts(labels: [string, string, string, string]) {
  return [
    { label: labels[0], value: 0 },
    { label: labels[1], value: 1 },
    { label: labels[2], value: 2 },
    { label: labels[3], value: 3 },
  ]
}

export const questions: Question[] = [
  // -- Security Fundamentals --------------------------------------------------
  {
    id: 'sec-1',
    category: 'security',
    text: 'How familiar are you with threat modeling methodologies (e.g. STRIDE, PASTA, LINDDUN)?',
    options: opts([
      "I've heard the term but never used them",
      "I understand the concept but haven't applied them formally",
      'I can apply STRIDE or similar to a system independently',
      'I lead threat modeling exercises and mentor others',
    ]),
  },
  {
    id: 'sec-2',
    category: 'security',
    text: 'What is your experience with vulnerability assessment and CVE triage?',
    options: opts([
      'No hands-on experience',
      'I can read CVE descriptions and understand severity ratings',
      'I have triaged vulnerabilities and prioritized remediation in a real environment',
      'I build vulnerability management programs and have experience with CVSS scoring at scale',
    ]),
  },
  {
    id: 'sec-3',
    category: 'security',
    text: 'How comfortable are you with security monitoring and SIEM tooling?',
    options: opts([
      'No experience with SIEM tools',
      "I've used dashboards but not written detection rules",
      "I've written detection rules and tuned alerts in a production SIEM",
      "I've designed detection pipelines and built custom analytics for threat hunting",
    ]),
  },
  {
    id: 'sec-4',
    category: 'security',
    text: 'What is your experience with penetration testing or red teaming?',
    options: opts([
      'No hands-on experience',
      "I've completed CTFs or practice labs (e.g. HackTheBox, TryHackMe)",
      "I've performed pentests in professional engagements or internal red team exercises",
      'I lead red team engagements or have delivered pentest reports to clients',
    ]),
  },
  {
    id: 'sec-5',
    category: 'security',
    text: 'How familiar are you with incident response procedures?',
    options: opts([
      'No direct involvement in IR',
      'I understand the IR lifecycle and have studied playbooks',
      "I've participated in or led incident response for real security events",
      "I've built IR programs, runbooks, and tabletop exercises from scratch",
    ]),
  },

  // -- AI & ML Systems --------------------------------------------------------
  {
    id: 'ai-1',
    category: 'ai-ml',
    text: 'How well do you understand how large language models (LLMs) work internally?',
    options: opts([
      "I know LLMs exist but not how they function",
      'I understand the general concept of transformers and token prediction',
      'I can explain attention mechanisms, context windows, and temperature, and how they affect behavior',
      "I've fine-tuned models, read architecture papers, or worked on LLM infrastructure",
    ]),
  },
  {
    id: 'ai-2',
    category: 'ai-ml',
    text: 'What is your familiarity with RAG (Retrieval-Augmented Generation) pipelines?',
    options: opts([
      'Not familiar with RAG',
      'I understand the concept: retrieve context, inject into prompt',
      'I understand chunking strategies, embedding models, and vector database design tradeoffs',
      "I've built or audited production RAG systems and understand their failure modes",
    ]),
  },
  {
    id: 'ai-3',
    category: 'ai-ml',
    text: 'How familiar are you with AI agents and multi-agent systems?',
    options: opts([
      'Not familiar with AI agents beyond chatbots',
      'I understand the concept: LLMs with tool use and memory',
      'I understand ReAct loops, tool calling, and agent orchestration frameworks (LangChain, AutoGen)',
      "I've built or red-teamed multi-agent systems in production",
    ]),
  },
  {
    id: 'ai-4',
    category: 'ai-ml',
    text: 'What is your exposure to AI/ML model training and deployment pipelines?',
    options: opts([
      'No hands-on experience',
      "I've run pre-built notebooks or tutorials (e.g. Hugging Face quickstarts)",
      "I've trained, evaluated, and deployed models to production environments",
      "I've built MLOps pipelines, managed model registries, or worked on model serving infrastructure",
    ]),
  },
  {
    id: 'ai-5',
    category: 'ai-ml',
    text: 'How familiar are you with AI-specific attack techniques (e.g. prompt injection, model inversion)?',
    options: opts([
      'Not familiar with AI-specific attacks',
      "I've read about prompt injection and jailbreaking at a high level",
      'I understand prompt injection, data poisoning, model extraction, and membership inference',
      "I've performed or researched these attacks against real systems",
    ]),
  },

  // -- Risk & Governance ------------------------------------------------------
  {
    id: 'risk-1',
    category: 'risk',
    text: 'How familiar are you with AI-specific risk frameworks (e.g. NIST AI RMF, EU AI Act, ISO 42001)?',
    options: opts([
      'Not familiar with any AI governance frameworks',
      "I've heard of them and understand their general purpose",
      'I can apply NIST AI RMF or similar to classify AI system risk and identify controls',
      "I've implemented these frameworks in an organization or advised on compliance",
    ]),
  },
  {
    id: 'risk-2',
    category: 'risk',
    text: 'What is your experience working with compliance and regulatory requirements?',
    options: opts([
      'No professional compliance experience',
      "I've read regulations (SOC 2, ISO 27001, GDPR) and understand their intent",
      "I've worked on compliance programs: gap assessments, control documentation, audits",
      "I've led compliance initiatives, managed audits, or built GRC programs",
    ]),
  },
  {
    id: 'risk-3',
    category: 'risk',
    text: 'How comfortable are you producing risk assessment documentation?',
    options: opts([
      'No experience writing formal risk documentation',
      'I understand risk registers and likelihood/impact matrices conceptually',
      "I've written risk assessments, produced findings reports, or contributed to risk registers",
      "I've built risk assessment methodologies or reviewed others' assessments for accuracy",
    ]),
  },
  {
    id: 'risk-4',
    category: 'risk',
    text: 'What is your experience with data privacy regulations (GDPR, CCPA, HIPAA)?',
    options: opts([
      'Limited awareness of data privacy laws',
      'I understand the general principles and key requirements',
      "I've applied these regulations in a work context: data mapping, DPIAs, consent flows",
      "I've advised on or implemented privacy programs, handled breach notifications, or built privacy-by-design into systems",
    ]),
  },
  {
    id: 'risk-5',
    category: 'risk',
    text: 'Have you worked on AI governance, responsible AI, or ethics programs?',
    options: opts([
      'No experience in this area',
      "I've read about responsible AI principles and AI ethics frameworks",
      "I've contributed to AI governance reviews, model cards, or internal responsible AI guidelines",
      "I've built or led AI governance programs or advised organizations on responsible AI strategy",
    ]),
  },
]

export function calculateResult(answers: Record<string, number>): AssessmentResult {
  const scores: Record<Category, number> = { security: 0, 'ai-ml': 0, risk: 0 }
  const counts: Record<Category, number> = { security: 0, 'ai-ml': 0, risk: 0 }

  for (const q of questions) {
    if (answers[q.id] !== undefined) {
      scores[q.category] += answers[q.id]
      counts[q.category]++
    }
  }

  const maxScores: Record<Category, number> = {
    security: counts.security * 3,
    'ai-ml': counts['ai-ml'] * 3,
    risk: counts.risk * 3,
  }

  const percentages: Record<Category, number> = {
    security: maxScores.security > 0 ? Math.round((scores.security / maxScores.security) * 100) : 0,
    'ai-ml':  maxScores['ai-ml']  > 0 ? Math.round((scores['ai-ml']  / maxScores['ai-ml'])  * 100) : 0,
    risk:     maxScores.risk      > 0 ? Math.round((scores.risk      / maxScores.risk)      * 100) : 0,
  }

  const totalScore = (Object.values(scores) as number[]).reduce((a, b) => a + b, 0)
  const totalMax   = (Object.values(maxScores) as number[]).reduce((a, b) => a + b, 0)
  const totalPct   = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0

  const recommendedTrack: 'security-pro' | 'career-changer' =
    percentages.security >= 50 ? 'security-pro' : 'career-changer'

  return { scores, maxScores, percentages, recommendedTrack, totalPct }
}
