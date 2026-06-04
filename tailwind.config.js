/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        myntra: {
          pink: '#ff3f6c',
          light: '#fff0f3',
          dark: '#282c3f',
          gray: '#696b79',
          border: '#eaeaec',
          green: '#03a685',
          orange: '#ff905a',
          yellow: '#ffb703',
        }
      },
      fontFamily: {
        sans: ['Whitney', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        pulse2: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.5' } },
        bounceIn: { '0%': { transform: 'scale(0.8)', opacity: '0' }, '60%': { transform: 'scale(1.1)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.25s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
        'marquee': 'marquee 30s linear infinite',
        'bounce-in': 'bounceIn 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
