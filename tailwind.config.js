/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-exo2)", "sans-serif"], // default font
        orbitron: ["var(--font-orbitron)", "sans-serif"], // custom font
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
