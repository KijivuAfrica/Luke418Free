export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          300: '#E8C96A',
          400: '#D4A843',
          500: '#C49A2A',
          600: '#A8821F',
          700: '#8B6B18',
        },
        ink: {
          900: '#0F0D08',
          800: '#1A1611',
          700: '#2A2318',
        },
        cream: {
          50: '#FDFAF3',
          100: '#FAF5E8',
          200: '#F3E8CC',
        },
      },
    },
  },
  plugins: [],
}
