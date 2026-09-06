/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0a0e14',
          900: '#0f1420',
          800: '#161c2c',
          700: '#1f2738',
          600: '#2b3448',
          500: '#3d4762',
        },
        accent: {
          DEFAULT: '#3dd9c1',
          light: '#6ee7d4',
          dark: '#2bb5a0',
        },
        paper: '#f5f7fa',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
}
