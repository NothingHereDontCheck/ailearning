import { NextRequest, NextResponse } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getSessionUser, generateId, SESSION_COOKIE } from '@/lib/auth'
import { calculateResult } from '@/lib/assessment-data'
import { validateAssessmentAnswers, ValidationError } from '@/lib/validation'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  }

  let typedAnswers: Record<string, number>
  try {
    typedAnswers = validateAssessmentAnswers((body as Record<string, unknown>)?.answers)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof ValidationError ? err.message : 'answers is required' },
      { status: 400 }
    )
  }

  const result = calculateResult(typedAnswers)

  const sessionId = request.cookies.get(SESSION_COOKIE)?.value
  if (sessionId) {
    const { env } = getCloudflareContext()
    const user = await getSessionUser(env.DB, sessionId)
    if (user) {
      await env.DB.prepare(
        'INSERT INTO assessment_results (id, user_id, scores, recommended_track) VALUES (?, ?, ?, ?)'
      )
        .bind(
          generateId(),
          user.id,
          JSON.stringify(result.percentages),
          result.recommendedTrack
        )
        .run()

      if (!user.persona) {
        await env.DB.prepare('UPDATE users SET persona = ? WHERE id = ?')
          .bind(result.recommendedTrack, user.id)
          .run()
      }
    }
  }

  return NextResponse.json({ ok: true, result })
}
