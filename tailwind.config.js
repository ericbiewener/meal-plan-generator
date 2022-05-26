module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [
    ({ addVariant }) => {
      addVariant("children", "& > *");
      addVariant('not-last', '&:not(:last-child)');
    },
  ],
  safelist: [{ pattern: /(bg-|text-|border-)/, variants: ["hover", "active"] }],
};
