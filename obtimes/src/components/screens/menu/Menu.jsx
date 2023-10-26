import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = () => {
    return (
        <>
            <div className="menu">
                <nav>
                    <ul>
                        {[
                            { path: '/temp', label: 'Work History', defaultClass: 'link icon work' },
                            { path: '/addunitslist', label: 'Add units list', defaultClass: 'link icon lock' },
                            { path: '/statistic', label: 'Personal Statistic', defaultClass: 'link icon work' },
                            // { path: '/general', label: 'General', defaultClass: 'link icon general' },
                            // { path: '/charts', label: 'Charts', defaultClass: 'link icon charts' },
                            // { path: '/notes', label: 'Work notes', defaultClass: 'link icon notes' },
                        ].map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/obtimes/'}
                            >
                                {({ isActive }) => {
                                    {isActive ? document.title = item.label : null}
                                    return (
                                        <li
                                            className={isActive ? 'active ' + item.defaultClass : item.defaultClass}
                                            onClick={()=>{document.title = item.label}}
                                        >                                            
                                            {item.label}
                                        </li>
                                    )
                                }}
                            </NavLink>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Menu