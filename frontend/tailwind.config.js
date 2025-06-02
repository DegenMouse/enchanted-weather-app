/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'scan': 'scan 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'blink': 'blink 1s infinite',
      },
      keyframes: {
        scan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        flicker: {
          '0%, 100%': { opacity: '0.97' },
          '50%': { opacity: '0.95' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      colors: {
        'retro-green': '#00ff00',
        'retro-yellow': '#ffff00',
        'retro-black': '#000000',
        'retro-gray': '#1a1a1a',
      },
    },
  },
  plugins: [],
} 