import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getSessionUser, generateId, SESSION_COOKIE } from '@/lib/auth'
import { validateModuleId, ValidationError } from '@/lib/validation'

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE)?.value
  if (!sessionId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  let moduleId: string
  try {
    moduleId = validateModuleId((body as Record<string, unknown>)?.moduleId)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof ValidationError ? err.message : 'moduleId is required' },
      { status: 400 }
    )
  }

  const { env } = getCloudflareContext()
  const user = await getSessionUser(env.DB, sessionId)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await env.DB.prepare(
    'INSERT OR IGNORE INTO module_completions (id, user_id, module_id) VALUES (?, ?, ?)'
  )
    .bind(generateId(), user.id, moduleId)
    .run()

  const completions = await env.DB.prepare(
    'SELECT module_id FROM module_completions WHERE user_id = ?'
  )
    .bind(user.id)
    .all<{ module_id: string }>()

  return NextResponse.json({
    ok: true,
    completedModules: completions.results.map((r: { module_id: string }) => r.module_id),
  })
}
