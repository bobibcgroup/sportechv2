import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#080b14',
        'section-alt': '#0f172a',
        yellow: {
          DEFAULT: '#facc15',
          dark: '#ca9a04',
        },
        green: {
          neon: '#4ade80',
        },
        purple: {
          glow: '#c084fc',
        },
        cyan: {
          glow: '#38bdf8',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
}
export default config
