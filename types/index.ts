export type Persona = 'security-pro' | 'career-changer'

export type Phase = {
  id: string
  number: number
  title: string
  durationWeeks: string
  modules: Module[]
}

export type Module = {
  id: string
  title: string
  description: string
  estimatedHours: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  personas: Persona[]
  contentType: 'article' | 'lab' | 'project' | 'assessment' | 'video'
  isLocked: boolean
  icon: string
  tags: string[]
}

export type UserProgress = {
  userId: string
  persona: Persona
  completedModules: string[]
  currentPhase: number
  lastActiveAt: Date
}

export type User = {
  id: string
  email: string
  persona: Persona | null
  createdAt: number
  updatedAt: number
}

export type Session = {
  id: string
  userId: string
  expiresAt: number
  createdAt: number
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  publishedAt: string
  readingTime: number
  persona: 'security-pro' | 'career-changer' | 'all'
  tags: string[]
  featured: boolean
}
