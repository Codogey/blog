import React, { useContext, useEffect, useState} from 'react'
import Toggle from 'react-toggle'
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';

import { ThemeContext } from '../themes/ThemeContext'

const ThemeToggle = () => {
    const { theme, setThemeGlobal } = useContext(ThemeContext)
    const checkedIcon = (
        <img
            src={sun}
            width="16px"
            height="16px"
            role="presentation"
            style={{ pointerEvents: 'none' }}
        />
    );
    const uncheckedIcon = (
        <img
            src={moon}
            width="16px"
            height="16px"
            role="presentation"
            style={{ pointerEvents: 'none' }}
        />
    );
    const handleThemeToggleChanged = (e) => {
        const checkStatus = e.target.checked
        setThemeGlobal(checkStatus ? 'light' : 'dark')
    }
    return (
        <Toggle
            id='cheese-status'
            icons={{ checked: checkedIcon, unchecked: uncheckedIcon }}
            onChange={handleThemeToggleChanged}
            defaultChecked={theme === 'dark' ? false : true}
        />
    );

}

export default ThemeToggle;