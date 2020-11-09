module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        // DARK themes
        font: 'var(--color-text-primary)',
        background: 'var(--background-primary)', 
        // text: '#b3b9c5',
        textTitle: 'var(--color-text-secondary)',
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
