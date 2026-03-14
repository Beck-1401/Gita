/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        garamond: ['"EB Garamond"', 'Georgia', 'serif'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      colors: {
        parchment: '#f5edd6',
        ink: '#2c1a0e',
        kaurava: '#c0392b',
        pandava: '#1a5276',
        gold: '#d4a843',
      },
    },
  },
  plugins: [],
}
