/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // toggle via .dark class on <html>
  theme: {
    extend: {
      colors: {
        // ── Midnight Teal Design System ──────────────────────
        teal: {
          primary:  '#00D4AA',
          dark:     '#0F6E56',
          mid:      '#1D9E75',
          dim:      'rgba(0,212,170,0.15)',
          glow:     'rgba(0,212,170,0.08)',
        },
        navy: {
          deepest: '#060A10',
          dark:    '#0C1320',
          mid:     '#111C2E',
          light:   '#1A2D42',
          muted:   '#243447',
        },
        content: {
          primary:   '#C8DFF0',
          secondary: '#5A7A9A',
          heading:   '#EAF4FF',
          muted:     '#3A5A72',
        },
        light: {
          bg:        '#F0F8FF',
          bgAlt:     '#E0EAF5',
          card:      '#FFFFFF',
          border:    '#CBD5E0',
          text:      '#1A3040',
          textMuted: '#5A7090',
        },
        status: {
          green:  '#4ADE80',
          yellow: '#F59E0B',
          red:    '#EF4444',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      fontSize: {
        'hero':  ['clamp(2.8rem, 7vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'h1':    ['clamp(2rem, 4vw, 3.2rem)',   { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'h2':    ['clamp(1.4rem, 3vw, 2rem)',   { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'label': ['0.75rem',                    { lineHeight: '1',    letterSpacing: '0.1em'  }],
      },
      spacing: {
        'nav': '72px', // navbar height — use as padding-top on page sections
      },
      maxWidth: {
        'content': '1200px',
      },
      animation: {
        'marquee':      'marquee 25s linear infinite',
        'marquee-rev':  'marquee-rev 30s linear infinite',
        'pulse-dot':    'pulse-dot 2s ease-in-out infinite',
        'scroll-line':  'scroll-line 2s ease-in-out infinite',
        'fade-up':      'fade-up 0.6s ease-out forwards',
      },
      keyframes: {
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'pulse-dot': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(74,222,128,0.5)' },
          '50%':      { boxShadow: '0 0 0 6px rgba(74,222,128,0)' },
        },
        'scroll-line': {
          '0%':   { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%':  { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%':  { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        'fade-up': {
          'from': { opacity: '0', transform: 'translateY(24px)' },
          'to':   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        nav: '12px',
      },
      boxShadow: {
        'teal':     '0 0 30px rgba(0,212,170,0.25)',
        'teal-lg':  '0 0 60px rgba(0,212,170,0.35)',
        'card':     '0 4px 24px rgba(0,0,0,0.3)',
        'card-hover':'0 12px 40px rgba(0,0,0,0.5)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}