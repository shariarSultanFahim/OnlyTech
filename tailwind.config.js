/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryColor':'#bac3bf',
        'secendaryColor':'#eef1f0',
        'bgColor':'#cdcfd2'
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

