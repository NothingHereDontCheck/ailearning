export class ValidationError extends Error {
  readonly status = 400
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

// RFC 5321 max email length
const EMAIL_MAX_LENGTH = 254
// Stricter than the inline regex used in routes — rejects unicode confusables and bare IPs
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

// Tokens are 32 random bytes encoded as 64 lowercase hex chars (generateId())
const TOKEN_REGEX = /^[0-9a-f]{64}$/

// Module IDs are slug-like: letters, digits, hyphens, underscores
const MODULE_ID_REGEX = /^[a-zA-Z0-9_-]{1,100}$/

// Assessment question keys produced by our own form — same charset, shorter
const ANSWER_KEY_REGEX = /^[a-zA-Z0-9_-]{1,50}$/

export function validateEmail(value: unknown): string {
  if (typeof value !== 'string') throw new ValidationError('Email must be a string.')
  const trimmed = value.trim().toLowerCase()
  if (trimmed.length === 0) throw new ValidationError('Email is required.')
  if (trimmed.length > EMAIL_MAX_LENGTH) throw new ValidationError('Email address is too long.')
  if (!EMAIL_REGEX.test(trimmed)) throw new ValidationError('Enter a valid email address.')
  return trimmed
}

export function validateToken(value: unknown, fieldName = 'Token'): string {
  if (typeof value !== 'string') throw new ValidationError(`${fieldName} must be a string.`)
  if (!TOKEN_REGEX.test(value)) throw new ValidationError(`Invalid ${fieldName.toLowerCase()} format.`)
  return value
}

export function validateModuleId(value: unknown): string {
  if (typeof value !== 'string') throw new ValidationError('moduleId must be a string.')
  if (!MODULE_ID_REGEX.test(value))
    throw new ValidationError('moduleId may only contain letters, digits, hyphens, and underscores (max 100 chars).')
  return value
}

export function validateAssessmentAnswers(value: unknown): Record<string, number> {
  if (typeof value !== 'object' || value === null || Array.isArray(value))
    throw new ValidationError('answers must be a non-null object.')

  const entries = Object.entries(value as Record<string, unknown>)
  if (entries.length === 0) throw new ValidationError('answers must not be empty.')
  if (entries.length > 200) throw new ValidationError('Too many answer keys.')

  const sanitized: Record<string, number> = {}
  for (const [key, val] of entries) {
    if (!ANSWER_KEY_REGEX.test(key))
      throw new ValidationError(`Invalid answer key: "${key}".`)
    if (typeof val !== 'number' || !Number.isFinite(val))
      throw new ValidationError(`Answer value for "${key}" must be a finite number.`)
    if (val < 0 || val > 10)
      throw new ValidationError(`Answer value for "${key}" must be between 0 and 10.`)
    sanitized[key] = val
  }
  return sanitized
}
