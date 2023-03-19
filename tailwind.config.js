module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#4A4A4A",
          200: "#3E3E3E",
          300: "#333333",
          400: "#282828",
          500: "#1C1C1C",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
    },
  },
  plugins: [],
};
