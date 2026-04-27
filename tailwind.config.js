/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1E2A38',
        'dark-bg-secondary': '#2A3442',
        'dark-surface': '#34495E',
        'dark-border': '#4B5563',
      },
    },
  },
  plugins: [],
}
