import type { Metadata } from 'next'
import { DM_Serif_Display, Outfit, DM_Mono } from 'next/font/google'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AITrustAudit — Become an AI Security Engineer',
    template: '%s | AITrustAudit',
  },
  description:
    'A structured career roadmap for transitioning into AI Security Engineering. Two tracks: security professionals and career changers.',
  keywords: ['AI security', 'AI security engineer', 'career roadmap', 'LLM security', 'prompt injection', 'AI red teaming'],
  openGraph: {
    title: 'AITrustAudit — Become an AI Security Engineer',
    description: 'A structured, no-fluff learning path for people serious about transitioning into AI Security Engineering.',
    url: 'https://aitrustaudit.com',
    siteName: 'AITrustAudit',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${outfit.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
