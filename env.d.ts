interface CloudflareEnv {
  DB: D1Database
  NEXT_CACHE_WORKERS_KV: KVNamespace
  RESEND_API_KEY: string
  SESSION_SECRET: string
  NEXT_PUBLIC_APP_URL: string
}
