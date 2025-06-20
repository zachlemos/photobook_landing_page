/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        charcoal: '#121212',
        'off-white': '#F8F8F8',
        cream: '#FFF9F5',
        'soft-gray': '#F6F6F6',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(90deg, #fbb6ce, #fde68a)',
        'gradient-accent-hover': 'linear-gradient(90deg, #f9a8d4, #fcd34d)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-soft': 'pulse 3s infinite',
        'hero-fade-in': 'heroFadeIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'hero-fade-in-delayed': 'heroFadeIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.3s forwards',
        'hero-fade-in-more-delayed': 'heroFadeIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) 0.6s forwards',
        'scroll-fade-up': 'scrollFadeUp 1s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'scroll-fade-up-delayed': 'scrollFadeUp 1s cubic-bezier(0.25, 1, 0.5, 1) 0.2s forwards',
        'scroll-fade-up-more-delayed': 'scrollFadeUp 1s cubic-bezier(0.25, 1, 0.5, 1) 0.4s forwards',
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heroFadeIn: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px) scale(0.95)',
            filter: 'blur(10px)'
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0px)'
          },
        },
        scrollFadeUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(50px) scale(0.98)',
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)',
          },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};