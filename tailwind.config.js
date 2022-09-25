/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "public/js/*.js"],
  theme: {
    extend: {
      colors: {

      }
    },
  },
  daisyui: {
    themes: ["luxury"],
  },
  plugins: [require("daisyui")],
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
      })
    })
  ]
}

