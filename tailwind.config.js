/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'accent': '#3C70A4',
        'body-bg': '#1F1F1F',
        'body-bg-hover': '#28282A',
        'border': '#191718',
        'text-light': '#D9D9D9',
        'text-gray': '#818181',
        'bg-trans': 'rgba(0, 0, 0, 0.7)'
      },
      fontSize: {
        'xs': '.75rem',       // 12px
        'sm': '.875rem',      // 14px
        'base': '1rem',       // 16px
        'lg': '1.125rem',     // 18px
        'xl': '1.25rem',      // 20px
        '2xl': '1.5rem',      // 24px
        '3xl': '1.875rem',    // 30px
        '4xl': '2.25rem',     // 36px
        '5xl': '3rem',        // 48px
        'small' : '13px',     // 13px
        'medium' : '22px',    // 22px
        'large' : '32px',     // 32px
        'xlarge' : '38px'     // 38px
      }
    },
  },
  plugins: [],
}
