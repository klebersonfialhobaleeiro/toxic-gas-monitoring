import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineAutoGraph, MdDashboard, MdReportGmailerrorred } from "react-icons/md";
import { useState } from 'react';
import Top from './Top';

import './Sidebar.scss'

function Sidebar({ active }) {

    const navItems = [
        {
            label: 'Dashboard', path : '/dashboard',
            icon: <MdDashboard className='sidebar__item__icon' />
        },
        {
            label: 'Analytics', path : '/analytics',
            icon: <MdOutlineAutoGraph className='sidebar__item__icon'/>
        },
        {
            label: 'Reports', path : '/Reports',
            icon: <MdReportGmailerrorred className='sidebar__item__icon'/>
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