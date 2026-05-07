import type { Metadata } from 'next'
import { DM_Serif_Display, Outfit, DM_Mono } from 'next/font/google'
import Script from 'next/script'
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
      <Script
        id="gtm"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WQ9J3453');`,
        }}
      />
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WQ9J3453"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
