/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fantasy: {
          dark: '#0c0e17',
          deep: '#141724',
          surface: '#1b2034',
          gold: '#e6b55c',
          amber: '#f59e0b',
          crimson: '#9e2a2b',
          royal: '#3b82f6',
          mystic: '#8b5cf6',
          border: '#3c3f58',
          parchment: '#fdf6e2',
          textMuted: '#94a3b8'
        }
      },
      fontFamily: {
        game: ['"Cinzel"', 'serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
        body: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
