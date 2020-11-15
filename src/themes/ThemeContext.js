import React, { useState, useEffect } from 'react'
import { DEFAULT_THEME } from './index';
import { applyTheme } from '../themes/utils'

const ThemeContext = React.createContext({
    theme: 'dark',
    setThemeGlobal: (theme) => {}
})

const ThemeProvider = ({children}) => {
    const [theme, setTheme ] = useState(DEFAULT_THEME);
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const setThemeGlobal = (theme) => {
        setTheme(theme)
    }

    return (
        <ThemeContext.Provider value={{
            theme: theme,
            setThemeGlobal: setThemeGlobal
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }
