import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // Required for @opennextjs/cloudflare
  },
  // Allow MDX pages
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  webpack(config) {
    // Enable ?raw imports — bundles file content as a plain string at build time.
    // This lets lesson MDX be read without fs, so it works in Cloudflare Workers.
    config.module.rules.push({ resourceQuery: /raw/, type: 'asset/source' })
    return config
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            // Tighten as fonts/scripts from additional hosts are added.
            value: [
              "default-src 'self'",
              // Inline styles are needed by some UI components — hashes preferred
              // but 'unsafe-inline' is the pragmatic baseline for Next.js.
              "style-src 'self' 'unsafe-inline'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "img-src 'self' data: blob:",
              "font-src 'self'",
              // fetch() calls from the browser go only to same origin
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "form-action 'self'",
              "base-uri 'self'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
      // API routes: also block cross-origin fetches via CORS
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://aitrustaudit.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          { key: 'Access-Control-Max-Age', value: '86400' },
        ],
      },
    ]
  },
}

export default nextConfig
