module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        // DARK themes
        font: 'var(--font)',
        background: 'var(--background)', 
        // text: '#b3b9c5',
        textTitle: 'var(--font-header)',
        'background-hover': 'var(--background-hover)',
        border: '#d6d9de',
        postTitle: '#DEE2E6',
        time: '#868E96',
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
