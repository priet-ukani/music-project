/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3e6',
          100: '#fce7cd',
          200: '#f9cf9b',
          300: '#f6b769',
          400: '#f39f37',
          500: '#f08705',
          600: '#c06c04',
          700: '#905103',
          800: '#603602',
          900: '#301b01',
        },
        secondary: {
          50: '#e6f3f5',
          100: '#cce7eb',
          200: '#99cfd7',
          300: '#66b7c3',
          400: '#339faf',
          500: '#00879b',
          600: '#006c7c',
          700: '#00515d',
          800: '#00363e',
          900: '#001b1f',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
}
