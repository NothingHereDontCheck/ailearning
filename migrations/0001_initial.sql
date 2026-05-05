-- AITrustAudit D1 Schema
-- Run: wrangler d1 execute aitrustaudit-db --file=migrations/0001_initial.sql

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  persona TEXT CHECK (persona IN ('security-pro', 'career-changer')),
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS auth_tokens (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  used INTEGER DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS module_completions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  completed_at INTEGER DEFAULT (unixepoch()),
  UNIQUE(user_id, module_id)
);

CREATE TABLE IF NOT EXISTS subscribers (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  confirm_token TEXT,
  unsubscribe_token TEXT,
  confirmed INTEGER DEFAULT 0,
  subscribed_at INTEGER DEFAULT (unixepoch()),
  unsubscribed_at INTEGER
);

CREATE TABLE IF NOT EXISTS assessment_results (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  taken_at INTEGER DEFAULT (unixepoch()),
  scores TEXT NOT NULL,
  recommended_track TEXT
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_auth_tokens_email ON auth_tokens(email);
CREATE INDEX IF NOT EXISTS idx_module_completions_user_id ON module_completions(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);
