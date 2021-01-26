import { useEffect, useState } from 'react';
import waterTheme from '../themes/waterTheme'
import fireTheme from '../themes/fireTheme'
import defaultTheme from '../themes/defaultTheme'

const themeList = {
  fireTheme,
  waterTheme,
  defaultTheme,
}

const usePokeTheme = () => {
    const [theme, setTheme] = useState(themeList.defaultTheme);
    const [mountedComponent, setMountedComponent] = useState(false)

    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(themeList[mode])
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        console.log(localTheme)
        localTheme && setTheme(themeList[localTheme])
        
        setMountedComponent(true)
    }, []);
    return [theme, setMode, mountedComponent]
};

export default usePokeTheme;