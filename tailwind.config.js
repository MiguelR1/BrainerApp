// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Escanea el archivo HTML principal
    "./src/**/*.{js,jsx,ts,tsx}", // Escanea cualquier archivo JS, TS, etc. dentro de src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}