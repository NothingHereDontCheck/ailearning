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
        ],
      },
    ]
  },
}

export default nextConfig
