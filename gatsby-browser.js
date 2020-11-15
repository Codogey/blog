// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"

// Style for code
import './src/css/prism-theme.scss'

import "react-toggle/style.css"
import './src/css/index.css'

import {ThemeProvider} from './src/themes/ThemeContext'
import React from 'react'

require("prismjs/plugins/command-line/prism-command-line.css")

export const wrapRootElement = ({ element }) => (
    <ThemeProvider>{element}</ThemeProvider>
  )