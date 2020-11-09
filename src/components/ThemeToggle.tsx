import React, { useEffect, useState} from 'react'
import Toggle from 'react-toggle'
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';

import { DEFAULT_THEME } from '../themes';
import { applyTheme } from '../themes/utils'

const ThemeToggle = () => {
      const [theme, setTheme ] = useState(DEFAULT_THEME);
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);
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
        setTheme(checkStatus ? 'light' : 'dark')
    }
    return (
        <Toggle
            id='cheese-status'
            icons={{ checked: checkedIcon, unchecked: uncheckedIcon }}
            onChange={handleThemeToggleChanged}
        />
    );

}

export default ThemeToggle;