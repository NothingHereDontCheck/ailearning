// Static map of all blog MDX content bundled at build time.
// Add an entry here whenever a new blog post is published.
import whatDoesAnAiSecurityEngineerDo from '../content/blog/what-does-ai-security-engineer-do.mdx?raw'
import socSkillsTransferable from '../content/blog/soc-skills-transferable.mdx?raw'
import careerChangerRealisticTimeline from '../content/blog/career-changer-realistic-timeline.mdx?raw'

export const blogContentMap: Record<string, string> = {
  'what-does-ai-security-engineer-do': whatDoesAnAiSecurityEngineerDo,
  'soc-skills-transferable': socSkillsTransferable,
  'career-changer-realistic-timeline': careerChangerRealisticTimeline,
}
