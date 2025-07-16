/** @type {import('tailwindcss').Config} */
console.log("TAILWIND CONFIG YÜKLENDİ");
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.css',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};