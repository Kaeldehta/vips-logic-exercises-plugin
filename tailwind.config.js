module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  variants: {
    extend: {
      display: ["group-hover"]
    }
  },
  corePlugins: {
    preflight: false,
  }
}
