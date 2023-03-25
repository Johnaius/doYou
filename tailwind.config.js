/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "public/js/*.js"],
  theme: {
      colors: {
        'purp': '#632b6c'
        
      },
    },
  daisyui: {
    themes: ["retro", ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
