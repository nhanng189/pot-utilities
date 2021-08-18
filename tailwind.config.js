module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
