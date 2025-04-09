import React from 'react'
import logo from './../assets/logo.svg'
import { MdClose } from "react-icons/md";

import './Top.scss'

function Top() {

    function handleClick() {
        const sidebar = document.querySelector('.main-aside');
        sidebar.classList.add('hide')
        // sidebar.style.display = "none";
    }

    return (
        <div className="top">
            <div className="logo">
                <img src={logo} alt="logo" className="media" />
                <h2><span className="primary">GAS</span>LEAK</h2>
            </div>
            <MdClose className="close" id="close-btn" onClick={() => handleClick()}/>
        </div>
    )
}

export default Top