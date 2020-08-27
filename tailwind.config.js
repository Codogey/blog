module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        // DARK themes
        textNormal: 'rgba(255, 255, 255, 0.88)',
        background: '#282c35',
        textTitle: '#ffffff'
      },
    },
    height: {
      '42px': '42px'
    }
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
}
