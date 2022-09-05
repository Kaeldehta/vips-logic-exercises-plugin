module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {
      animation: {
        blink: "blink 1s linear infinite",
      },
      keyframes: {
        blink: {
          "0%": {
            visibility: "visible",
          },
          "50%, 100%": {
            visibility: "hidden",
          },
        },
      },
    },
  },
};
