import React from 'react'
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useEffect } from 'react';

import './ThemeToggler.scss'

function ThemeToggler() {

    const availableThemes = ['light_mode', 'dark_mode'];

    const loadTheme = () => {
        const theme = localStorage.getItem("theme_mode");
      
        if (!availableThemes.includes(theme)) {
            setTheme('dark_mode');
            return;
        }
      
        setTheme(theme);
    }
  
    const setTheme = (theme) => {
        
        const lightThemeButton = document.querySelector("#light-btn");
        const darkThemeButton = document.querySelector("#dark-btn");

        if (theme === "dark_mode" ){
            darkThemeButton.classList.add("active");
            lightThemeButton.classList.remove("active");
        } else {
            lightThemeButton.classList.add("active");
            darkThemeButton.classList.remove("active");
        }
        
        if (!availableThemes.includes(theme)) {
            return
        }

        document.body.setAttribute("data-theme", theme);
        saveTheme(theme)
    }

    const saveTheme = (theme) => {
    localStorage.setItem("theme_mode", theme);
    }
  
    useEffect(() => {
      loadTheme()
    })

    function handleChangeTheme(theme) {
        setTheme(theme);
    }

    return (
        <div className="theme-toggler">
            <MdLightMode 
                className='toggler__icon' id="light-btn" 
                onClick={(e) => handleChangeTheme('light_mode')}/>
            <MdDarkMode 
                className='toggler__icon' id="dark-btn" 
                onClick={(e) => handleChangeTheme('dark_mode')}/>
        </div>
    )
}

export default ThemeToggler