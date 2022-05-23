module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    ({ addVariant }) => {
      addVariant('children', '& > *')
    }
  ],
}
