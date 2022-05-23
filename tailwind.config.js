module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [
    ({ addVariant }) => {
      addVariant("children", "& > *");
    },
  ],
  safelist: [{ pattern: /(bg-|text-|border-)/, variants: ["hover", "active"] }],
};
