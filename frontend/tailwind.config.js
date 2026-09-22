export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 30px rgba(99, 102, 241, 0.35)"
      },
      colors: {
        midnight: "#0b1020",
        violetsoft: "#7c3aed",
        cyansoft: "#5eead4"
      }
    }
  },
  plugins: []
};
