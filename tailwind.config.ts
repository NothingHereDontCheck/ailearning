import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        ink2: 'var(--ink2)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        border2: 'var(--border2)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
        accent4: 'var(--accent4)',
        gold: 'var(--gold)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      maxWidth: {
        content: '1100px',
      },
      boxShadow: {
        card: '6px 6px 0 var(--border2)',
      },
      borderRadius: {
        DEFAULT: '0',
        sm: '0',
        md: '0',
        lg: '0',
        xl: '0',
      },
    },
  },
  plugins: [],
}

export default config
