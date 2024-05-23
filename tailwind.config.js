/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: ["cupcake"],
  },
  plugins: [
    require('daisyui'),
  ],
}

