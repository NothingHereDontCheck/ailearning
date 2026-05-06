import type { Metadata } from 'next'
import { LoginForm } from './LoginForm'

export const metadata: Metadata = {
  title: 'Sign in',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div className="w-full max-w-[420px]">
      <div className="mb-8">
        <div className="section-eyebrow mb-4">AITrustAudit</div>
        <h1 className="font-serif text-[clamp(1.5rem,3vw,2rem)] text-ink tracking-[-0.3px] leading-[1.2] mb-2">
          Sign in
        </h1>
        <p className="text-[13px] text-muted">
          Enter your email and we&apos;ll send you a sign-in link. No password needed.
        </p>
      </div>

      {error === 'invalid-token' && (
        <div className="mb-4 p-3 border border-[rgba(200,64,26,0.3)] bg-[rgba(200,64,26,0.05)] text-accent text-[12px] font-mono">
          That link has expired or already been used. Request a new one below.
        </div>
      )}

      <LoginForm />
    </div>
  )
}
