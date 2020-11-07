module.exports = {
  purge: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        // DARK themes
        textNormal: 'rgba(255, 255, 255, 0.88)',
        background: '#1f2022', 
        text: '#b3b9c5',
        textTitle: '#FFD479',
        backgroundHover: '#3b3b3e',
        border: '#d6d9de',
        postTitle: '#DEE2E6',
        time: '#868E96',
        lightBackground: '#2D2D31'
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
