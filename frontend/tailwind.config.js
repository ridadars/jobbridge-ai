/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        electric: {
          DEFAULT: '#00aaff',
          bright: '#00d4ff',
          dim: '#0077aa',
        },
        navy: {
          DEFAULT: '#0a1628',
          mid: '#0d1f3c',
          card: '#111e35',
          border: '#1a2d4a',
          hover: '#162540',
        },
        black: '#050d1a',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease forwards',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
      },
    },
  },
  plugins: [],
}
