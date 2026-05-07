// Static map of all lesson MDX content bundled at build time.
// Add an entry here whenever a new lesson file is created.
import howLlmsWork from '../content/modules/p1-m1b/how-llms-work.mdx?raw'
import ragPipelines from '../content/modules/p1-m1b/rag-pipelines.mdx?raw'
import aiAgents from '../content/modules/p1-m1b/ai-agents.mdx?raw'
import fineTuning from '../content/modules/p1-m1b/fine-tuning.mdx?raw'
import aiDeployment from '../content/modules/p1-m1b/ai-deployment.mdx?raw'
import evaluatingAi from '../content/modules/p1-m1b/evaluating-ai.mdx?raw'
import aiSecurityLandscape from '../content/modules/p1-m1c/ai-security-landscape.mdx?raw'

export const lessonContentMap: Record<string, string> = {
  'p1-m1b/how-llms-work': howLlmsWork,
  'p1-m1b/rag-pipelines': ragPipelines,
  'p1-m1b/ai-agents': aiAgents,
  'p1-m1b/fine-tuning': fineTuning,
  'p1-m1b/ai-deployment': aiDeployment,
  'p1-m1b/evaluating-ai': evaluatingAi,
  'p1-m1c/ai-security-landscape': aiSecurityLandscape,
}
