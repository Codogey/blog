import { RoughNotation } from 'react-rough-notation'
import React, {useContext} from 'react'
import {ThemeContext} from '../themes/ThemeContext'
import darkTheme from '../themes/dark'
import lightTheme from '../themes/light'

export const Underline = (props) => (
    <RoughNotation type="underline" show={true} {...props} />
  )

  export const Box = (props) => {
    return (
      <RoughNotation
        type="box"
        show={true}
        color='#1aa6e9'
        multiline={true}
        {...props}
      />
    )
  }
  export const Circle = (props) => {
    return (
      <RoughNotation
        type="circle"
        show={true}
        color='#1aa6e9'
        multiline={true}
        {...props}
      />
    )
  }
  export const Highlight = (props) => {
    const { theme } = useContext(ThemeContext)
    console.log(theme)
    return (
      <RoughNotation
        type="highlight"
        show={true}
        color={theme === 'dark' ? darkTheme.highlight : lightTheme.highlight}
        // color='#fff176'
        multiline={true}
        {...props}
      />
    )
  }
  export const StrikeThrough = (props) => {
    return (
      <RoughNotation
        type="strike-through"
        show={true}
        color='#e9522c'
        multiline={true}
        {...props}
      />
    )
  }
  export const CrossedOff = (props) => {
    return (
      <RoughNotation
        type="crossed-off"
        show={true}
        color='#e9522c'
        multiline={true}
        {...props}
      />
    )
  }

