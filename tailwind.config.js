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
        body: ['Manrope', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        float: '0 24px 80px -36px rgba(15, 23, 42, 0.45)',
      },
    },
  },
  plugins: [],
}
