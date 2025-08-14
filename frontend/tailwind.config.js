/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purplish : "#7C71DF",
        secondary: "#F3F4F7",
      },
    },
  },
  plugins: [],
}

