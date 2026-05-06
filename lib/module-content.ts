import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const MODULES_DIR = path.join(process.cwd(), 'content/modules')

export type LessonMeta = {
  slug: string
  moduleId: string
  title: string
  description: string
  order: number
  estimatedMinutes: number
}

export function getLessonMeta(moduleId: string, slug: string): LessonMeta | null {
  const filePath = path.join(MODULES_DIR, moduleId, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)
  return {
    slug,
    moduleId,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    order: Number(data.order ?? 0),
    estimatedMinutes: data.estimatedMinutes ? Number(data.estimatedMinutes) : Math.ceil(rt.minutes),
  }
}

export function getRawLesson(moduleId: string, slug: string): { content: string; meta: LessonMeta } | null {
  const filePath = path.join(MODULES_DIR, moduleId, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const rt = readingTime(content)
  return {
    content,
    meta: {
      slug,
      moduleId,
      title: String(data.title ?? ''),
      description: String(data.description ?? ''),
      order: Number(data.order ?? 0),
      estimatedMinutes: data.estimatedMinutes ? Number(data.estimatedMinutes) : Math.ceil(rt.minutes),
    },
  }
}
