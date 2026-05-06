import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

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

export function getAllPosts(): BlogMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR)
  return files
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')
      const { data, content } = matter(raw)
      const rt = readingTime(content)
      return {
        slug,
        title: String(data.title ?? ''),
        description: String(data.description ?? ''),
        publishedAt: String(data.publishedAt ?? ''),
        persona: (data.persona as BlogMeta['persona']) ?? 'all',
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        featured: Boolean(data.featured),
        readingTime: Math.ceil(rt.minutes),
      }
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}

export function getRawPost(
  slug: string
): { content: string; meta: BlogMeta } | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
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

export function extractToc(content: string): TocEntry[] {
  const matches = Array.from(content.matchAll(/^(#{2,3})\s+(.+)$/gm))
  return matches.map((match) => ({
    level: match[1].length as 2 | 3,
    text: match[2].trim(),
    id: slugify(match[2].trim()),
  }))
}
