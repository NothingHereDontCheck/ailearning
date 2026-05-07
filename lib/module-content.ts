import matter from 'gray-matter'
import readingTime from 'reading-time'
import { lessonContentMap } from './lesson-content-map'

export type LessonMeta = {
  slug: string
  moduleId: string
  title: string
  description: string
  order: number
  estimatedMinutes: number
}

function parseMdx(moduleId: string, slug: string, raw: string): { content: string; meta: LessonMeta } {
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

export function getRawLesson(moduleId: string, slug: string): { content: string; meta: LessonMeta } | null {
  const raw = lessonContentMap[`${moduleId}/${slug}`]
  if (!raw) return null
  return parseMdx(moduleId, slug, raw)
}

export function getLessonMeta(moduleId: string, slug: string): LessonMeta | null {
  return getRawLesson(moduleId, slug)?.meta ?? null
}
