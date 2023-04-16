/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#0079FF",
          secondary: "#697C9A",
          hover: "#60ABFF",
          accent: "#4B6A9B",
          text: "#2B3442",
          bg1: "#F6F8FF",
          bg2: "#FEFEFE",
        },
        dark: {
          primary: "#0079FF",
          accent: "#90A4D4",
          text: "#FFFFFF",
          bg1: "#141D2F",
          bg2: "#1E2A47",
        },
      },
      fontFamily: {
        space: ["'Space Mono'", "monospace"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("prettier-plugin-tailwindcss"),
  ],
  darkMode: "class",
};
