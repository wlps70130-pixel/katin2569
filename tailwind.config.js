/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      colors: {
        ivory: '#fffaf0',
        cream: '#f8f3e7',
        lotus: '#ece2cb',
        emeraldTemple: '#14543d',
        leaf: '#2f7a57',
        moss: '#6d8060',
        mutedGold: '#b8954d',
        warmGold: '#d2b36b',
        ink: '#26312d',
      },
      boxShadow: {
        soft: '0 18px 60px rgba(20, 84, 61, 0.12)',
      },
    },
  },
  plugins: [],
};
