import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/mdx'
import { BlogList } from './BlogList'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical writing on AI security careers, LLM attack techniques, and the path to becoming an AI Security Engineer.',
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="section-wrap">
      <div className="section-eyebrow">From the Blog</div>
      <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] text-ink tracking-[-0.5px] leading-[1.1] mb-3">
        Writing worth<br />
        <em className="text-accent not-italic">reading first.</em>
      </h1>
      <p className="text-muted max-w-[580px] text-[15px] mb-12">
        No thought leadership. No vendor content. Practical writing for people
        who are serious about moving into AI security.
      </p>

      <BlogList posts={posts} />
    </div>
  )
}
