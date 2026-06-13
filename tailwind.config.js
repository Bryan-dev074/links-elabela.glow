/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chocolate': '#724540',
        'nude-glow': '#D6AB99',
        'cream': '#fcebdb',
        'terra': '#c18468',
        'brown': '#8b6357',
        'blush': '#e8c5b3',
        'soft-white': '#fdf6f0',
        'text-dark': '#5a3530',
        'text-mid': '#8b5e56',
        'text-light': '#b8806f',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'Georgia', 'serif'],
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'extralight': '200',
      },
      keyframes: {
        // Floating / Antigravity
        'float-a': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-b': {
          '0%, 100%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'float-c': {
          '0%, 100%': { transform: 'translateY(-8px)' },
          '50%': { transform: 'translateY(6px)' },
        },
        'float-d': {
          '0%, 100%': { transform: 'translateY(4px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-e': {
          '0%, 100%': { transform: 'translateY(-3px)' },
          '50%': { transform: 'translateY(9px)' },
        },
        // Aurora background
        'aurora-1': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)', opacity: '0.5' },
          '33%': { transform: 'translate(5%, -8%) scale(1.1)', opacity: '0.7' },
          '66%': { transform: 'translate(-4%, 6%) scale(0.95)', opacity: '0.4' },
        },
        'aurora-2': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)', opacity: '0.4' },
          '33%': { transform: 'translate(-6%, 5%) scale(1.05)', opacity: '0.6' },
          '66%': { transform: 'translate(8%, -4%) scale(1.1)', opacity: '0.3' },
        },
        'aurora-3': {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1.05)', opacity: '0.3' },
          '50%': { transform: 'translate(4%, -6%) scale(0.98)', opacity: '0.55' },
        },
        // Splash fade-out: fade + slide up
        'splash-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-30px)' },
        },
        // Splash entrance
        'splash-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        // Text fade for language switch
        'text-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Ring effect for WhatsApp buttons
        'ring': {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(15deg)' },
          '20%': { transform: 'rotate(-12deg)' },
          '30%': { transform: 'rotate(10deg)' },
          '40%': { transform: 'rotate(-8deg)' },
          '50%': { transform: 'rotate(6deg)' },
          '60%': { transform: 'rotate(-4deg)' },
          '70%': { transform: 'rotate(2deg)' },
          '80%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        // WhatsApp glow pulse
        'wa-glow': {
          '0%, 100%': { boxShadow: '0 0 10px 2px rgba(214,171,153,0.4)' },
          '50%': { boxShadow: '0 0 30px 8px rgba(214,171,153,0.75)' },
        },
        // Logo shimmer
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        // Fade in up for link cards
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Sparkle
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' },
        },
        // Overlay backdrop blur entrance
        'backdrop-in': {
          '0%': { opacity: '0', backdropFilter: 'blur(0px)' },
          '100%': { opacity: '1', backdropFilter: 'blur(20px)' },
        },
      },
      animation: {
        'float-a': 'float-a 5.5s ease-in-out infinite',
        'float-b': 'float-b 6.2s ease-in-out infinite',
        'float-c': 'float-c 4.8s ease-in-out infinite',
        'float-d': 'float-d 7.1s ease-in-out infinite',
        'float-e': 'float-e 5.9s ease-in-out infinite',
        'blob-1': 'blobDrift1 22s ease-in-out infinite',
        'blob-2': 'blobDrift2 28s ease-in-out infinite',
        'splash-out': 'splash-out 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'splash-in': 'splash-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'text-fade-in': 'text-fade-in 0.4s ease-out forwards',
        'ring': 'ring 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards',
        'wa-glow': 'wa-glow 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
      },
      boxShadow: {
        'nude': '0 0 20px rgba(214,171,153,0.3)',
        'nude-lg': '0 0 40px rgba(214,171,153,0.5)',
        'chocolate': '0 4px 20px rgba(114,69,64,0.4)',
        'glass': '0 8px 32px rgba(0,0,0,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.2), 0 1px 4px rgba(214,171,153,0.1)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(214,171,153,0.25)',
      },
    },
  },
  plugins: [],
}
