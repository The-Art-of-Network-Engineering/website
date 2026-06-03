import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A1628',
        surface: '#13243A',
        surfaceMuted: '#0F1C30',
        border: '#1F3354',
        accent: {
          green: '#5DDB9D',
          blue: '#3FB8DA',
        },
        text: {
          DEFAULT: '#F4F7FB',
          muted: '#B6C7DC',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        label: '0.18em',
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [typography],
};

export default config;
