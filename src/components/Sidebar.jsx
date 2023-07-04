import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineAutoGraph, MdDashboard, MdHistory } from "react-icons/md";
import { useState } from 'react';
import Top from './Top';

import './Sidebar.scss'

function Sidebar({ active }) {

    const navItems = [
        {
            label: 'Painel', path : '/dashboard',
            icon: <MdDashboard className='sidebar__item__icon' />
        },
        {
            label: 'Historico', path : '/reports',
            icon: <MdHistory className='sidebar__item__icon'/>
        }
    ]
    
    const isActive = (path) => {
        if (active === path) return 'active'
    }

    return (
        <aside className='main-aside '>
            <Top />
            <div className={'sidebar'}>
                { navItems.map(({label, path, icon}, index) => {
                    return (
                        <Link className={`sidebar__item ${isActive(path)}`} to={path} key={index}>
                            {icon}
                            <h3 className="sidebar__item__label"> {label} </h3>
                        </Link>
                    )
                })}
            </div>
        </aside>
    )
}

export default Sidebar