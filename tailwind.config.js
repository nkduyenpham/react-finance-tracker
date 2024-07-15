/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#c0cfb2",
          foreground: "hsl(var(--primary-foreground))",
        }
      }
    },
  },
  plugins: [],
}

