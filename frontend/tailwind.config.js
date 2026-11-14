/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        game: {
          bg: "#0B1120",
          card: "#1E293B",
          elevated: "#334155",
          primary: "#6366F1",
          secondary: "#8B5CF6",
          accent: "#06B6D4",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#F43F5E",
          text: "#F8FAFC",
          muted: "#94A3B8"
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'game-glow': '0 0 25px -5px rgba(99, 102, 241, 0.4)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'amber-glow': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
      }
    },
  },
  plugins: [],
}
