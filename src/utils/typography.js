import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = () => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
    },
    a: {
      color: 'hsl(210,38%,95%)',
      textDecoration: 'none',
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'hsl(345,100%,69%)',
      transition: 'all 200ms ease-in-out 0s',
      fontWeight: '700',
      boxShadow: 'none',
      // color: '#6ab0f3',
      // textDecoration: 'none',
      // fontWeight: '700',
      // borderColor: 'transparent'
    },
    'a:hover': {
      color: 'hsl(345,100%,69%)'
    },
    blockquote: {
      color: 'inherit',
      borderLeftColor: 'inherit',
      opacity: '0.8',
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
