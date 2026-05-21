/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        mist: '#f8fafc',
        sage: '#d2fae5',
        pine: '#0f766e',
        sunrise: '#f59e0b',
        ocean: '#0284c7',
      },
      fontFamily: {
        body: ['Instrument Sans', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      boxShadow: {
        float: '0 18px 48px -34px rgba(20, 24, 31, 0.45)',
      },
    },
  },
  plugins: [],
};
