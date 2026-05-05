import Link from 'next/link'

const posts = [
  {
    slug: 'what-does-ai-security-engineer-do',
    persona: 'all' as const,
    title: 'What Does an AI Security Engineer Actually Do All Day?',
    desc: 'An honest breakdown of the role across different company types — startup, enterprise, consultancy. Not the job description. The real job.',
    readTime: '7 min read',
  },
  {
    slug: 'soc-skills-transferable',
    persona: 'security-pro' as const,
    title: 'Your SOC Skills Are More Transferable Than You Think',
    desc: 'A skill-by-skill mapping of traditional security competencies to AI security requirements. Spoiler: you\'re closer than your imposter syndrome says.',
    readTime: '9 min read',
  },
  {
    slug: 'career-changer-realistic-timeline',
    persona: 'career-changer' as const,
    title: 'From Healthcare Compliance to AI Risk: One Year Later',
    desc: 'A transition story from someone who leveraged HIPAA expertise into an AI governance role. Timeline, what they studied, what actually helped.',
    readTime: '11 min read',
  },
  {
    slug: 'ai-security-certifications',
    persona: 'all' as const,
    title: 'The 6 AI Security Certifications Worth Your Time (and 4 That Aren\'t)',
    desc: 'Honest market value analysis of every AI-adjacent cert. Which ones hiring managers actually look for, and which exist purely to take your money.',
    readTime: '8 min read',
  },
  {
    slug: 'llm-red-teaming-crash-course',
    persona: 'security-pro' as const,
    title: 'LLM Red Teaming in 48 Hours: A Crash Course',
    desc: 'If you\'re a pentester who wants to start practicing AI red teaming this weekend, this is the post. Tools, targets, techniques — go.',
    readTime: '12 min read',
  },
  {
    slug: 'portfolio-no-security-experience',
    persona: 'career-changer' as const,
    title: 'Building a Portfolio With No Prior Security Experience',
    desc: 'The three projects that appear most in AI security hiring panels\' notes. How to build them, write about them, and not oversell them.',
    readTime: '10 min read',
  },
]

const personaStyles = {
  all: { cls: 'bg-[rgba(26,140,90,0.07)] border-[rgba(26,140,90,0.2)] text-accent3', label: 'Everyone' },
  'security-pro': { cls: 'bg-[rgba(200,64,26,0.07)] border-[rgba(200,64,26,0.2)] text-accent', label: 'Security Pros' },
  'career-changer': { cls: 'bg-bg2 border-border text-muted', label: 'Career Changers' },
}

export function BlogPreview() {
  return (
    <section className="section-wrap" id="blog">
      <div className="section-eyebrow">From the Blog</div>
      <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-ink tracking-[-0.5px] leading-[1.1] mb-3">
        Read this before<br /><em className="text-accent not-italic">anything else.</em>
      </h2>
      <p className="text-muted max-w-[580px] text-[15px] mb-12">
        The posts people share when someone in their Slack asks &ldquo;how do I get into AI security?&rdquo;
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[1.5px] bg-border border-[1.5px] border-border">
        {posts.map((post) => {
          const ps = personaStyles[post.persona]
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-surface p-7 transition-colors duration-200 hover:bg-bg flex flex-col group"
              aria-label={`Read: ${post.title}`}
            >
              <span
                className={`font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 inline-block mb-4 border w-fit ${ps.cls}`}
              >
                {ps.label}
              </span>
              <h3 className="font-serif text-[1.05rem] text-ink leading-[1.3] mb-2.5 flex-1">
                {post.title}
              </h3>
              <p className="text-[12px] text-muted leading-[1.6] mb-4">{post.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted">{post.readTime}</span>
                <span className="text-[12px] text-accent font-semibold">Read →</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent border-b-[1.5px] border-accent pb-0.5 transition-all duration-200 hover:gap-3"
        >
          View all posts →
        </Link>
      </div>
    </section>
  )
}
