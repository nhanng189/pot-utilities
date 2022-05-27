module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "blog-light-background":
          "linear-gradient(318.32deg,#c3d1e4,#dde7f3 55%,#d4e0ed)",
        "blog-dark-background": "#212529",
      },
    },
  },
  plugins: [],
};
