import matter from 'gray-matter'
import readingTime from 'reading-time'
import { blogContentMap } from './blog-content-map'

export type BlogMeta = {
  slug: string
  title: string
  description: string
  publishedAt: string
  readingTime: number
  persona: 'security-pro' | 'career-changer' | 'all'
  tags: string[]
  featured: boolean
}

export type TocEntry = {
  id: string
  text: string
  level: 2 | 3
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function parsePost(slug: string, raw: string): { content: string; meta: BlogMeta } {
  const { data, content } = matter(raw)
  const rt = readingTime(content)
  return {
    content,
    meta: {
      slug,
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      publishedAt: String(data.publishedAt ?? ''),
      persona: (data.persona as BlogMeta['persona']) ?? 'all',
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      featured: Boolean(data.featured),
      readingTime: Math.ceil(rt.minutes),
    },
  }
}

export function getAllPosts(): BlogMeta[] {
  return Object.entries(blogContentMap)
    .map(([slug, raw]) => parsePost(slug, raw).meta)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getRawPost(slug: string): { content: string; meta: BlogMeta } | null {
  const raw = blogContentMap[slug]
  if (!raw) return null
  return parsePost(slug, raw)
}

export function extractToc(content: string): TocEntry[] {
  const matches = Array.from(content.matchAll(/^(#{2,3})\s+(.+)$/gm))
  return matches.map((match) => ({
    level: match[1].length as 2 | 3,
    text: match[2].trim(),
    id: slugify(match[2].trim()),
  }))
}
