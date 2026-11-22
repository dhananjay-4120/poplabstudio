import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'electric-tangerine': {
          DEFAULT: '#FF5E14',
          50: '#FFF0EA',
          100: '#FFDEC8',
          200: '#FFB890',
          300: '#FF9158',
          400: '#FF722C',
          500: '#FF5E14',
          600: '#E04E0B',
          700: '#B83B04',
          800: '#922D00',
          900: '#722400',
        },
        'maritime-azure': {
          DEFAULT: '#0E4D7A',
          50: '#E8F4FC',
          100: '#C7E4F8',
          200: '#93CCF2',
          300: '#5FB3EB',
          400: '#2A9AE4',
          500: '#0E4D7A',
          600: '#0B3F64',
          700: '#08314E',
          800: '#052338',
          900: '#031522',
        },
        'twilight-indigo': {
          DEFAULT: '#1A2436',
          50: '#E9ECF1',
          100: '#CCD3DF',
          200: '#A4B1C6',
          300: '#7B8EAD',
          400: '#536C94',
          500: '#1A2436',
          600: '#151D2C',
          700: '#101622',
          800: '#0B0F17',
          900: '#06080D',
        },
        'bone-alabaster': {
          DEFAULT: '#F5F2EB',
          50: '#FFFFFF',
          100: '#FAF8F5',
          200: '#F5F2EB',
          300: '#EBE5D7',
          400: '#DDD4BF',
          500: '#CDBFA3',
        },
        'dark-void': '#090D14',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-jakarta)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        spaceMono: ['var(--font-space-mono)', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        kicker: '0.22em',
      },
      backdropBlur: {
        xs: '2px',
        glass: '16px',
      },
      boxShadow: {
        'glass-nav': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'tangerine-glow': '0 0 35px -5px rgba(255, 94, 20, 0.35)',
        'azure-glow': '0 0 45px -5px rgba(14, 77, 122, 0.40)',
      },
    },
  },
  plugins: [],
};

export default config;
