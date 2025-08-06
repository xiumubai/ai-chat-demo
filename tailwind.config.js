/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            maxWidth: '100%',
            code: {
              color: theme('colors.blue.600'),
              backgroundColor: theme('colors.blue.50'),
              borderRadius: theme('borderRadius.md'),
              padding: '0.2em 0.4em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.gray.800'),
              borderRadius: theme('borderRadius.lg'),
              padding: '1em',
              overflow: 'auto',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.200'),
            code: {
              color: theme('colors.blue.400'),
              backgroundColor: theme('colors.blue.900'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.200'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
}