import React from 'react'
import ThemeToggler from './ThemeToggler';
import { MdLightMode, MdDarkMode, MdMenu } from "react-icons/md";

import './Navbar.scss'

function Navbar({changeTheme}) {

    function handleClick() {
        const sidebar = document.querySelector('.main-aside');
        if (sidebar.classList.contains('hide')) {
            sidebar.classList.remove('hide');
        }
        sidebar.style.display = 'block';
    }

    return (
        <div className="navbar">
            <button id="menu-btn">
                <MdMenu className="close" id="" onClick={(e) => handleClick()}/>
            </button>
            <ThemeToggler />
        </div>
    )
}

export default Navbar