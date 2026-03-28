/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      keyframes: {
        glitch: {
          '0%': { 'clip-path': 'inset(20% 0 50% 0)' },
          '5%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '10%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '15%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '20%': { 'clip-path': 'inset(30% 0 40% 0)' },
          '25%': { 'clip-path': 'inset(40% 0 20% 0)' },
          '30%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '35%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '40%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '45%': { 'clip-path': 'inset(30% 0 40% 0)' },
          '50%': { 'clip-path': 'inset(20% 0 50% 0)' },
          '55%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '60%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '65%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '70%': { 'clip-path': 'inset(30% 0 40% 0)' },
          '75%': { 'clip-path': 'inset(40% 0 20% 0)' },
          '80%': { 'clip-path': 'inset(20% 0 50% 0)' },
          '85%': { 'clip-path': 'inset(10% 0 60% 0)' },
          '90%': { 'clip-path': 'inset(15% 0 55% 0)' },
          '95%': { 'clip-path': 'inset(25% 0 35% 0)' },
          '100%': { 'clip-path': 'inset(30% 0 40% 0)' },
        },
      },
      animation: {
        'glitch-after': 'glitch var(--after-duration) infinite linear alternate-reverse',
        'glitch-before': 'glitch var(--before-duration) infinite linear alternate-reverse',
      },
      typography: () => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--foreground)',
              '--tw-prose-headings': 'var(--foreground)',
              '--tw-prose-links': 'var(--foreground)',
              '--tw-prose-bold': 'var(--foreground)',
              '--tw-prose-counters': 'var(--muted-foreground)',
              '--tw-prose-bullets': 'var(--muted-foreground)',
              '--tw-prose-hr': 'var(--border)',
              '--tw-prose-quotes': 'var(--foreground)',
              '--tw-prose-quote-borders': 'var(--border)',
              '--tw-prose-code': 'var(--foreground)',
              '--tw-prose-pre-code': 'var(--palette-cream)',
              '--tw-prose-pre-bg': 'var(--palette-black)',
              '--tw-prose-th-borders': 'var(--border)',
              '--tw-prose-td-borders': 'var(--border)',
              h1: {
                fontWeight: '800',
                marginBottom: '0.25em',
              },
              p: {
                lineHeight: '1.75',
              },
              li: {
                lineHeight: '1.75',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 800,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}

export default config
