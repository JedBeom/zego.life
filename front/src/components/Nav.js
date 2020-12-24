import React from 'react'
import {NavLink} from 'react-router-dom'

const Nav = () => {
    return (
        <nav>
            <ul className={"flex justify-around gray"}>
                <li>
                    <NavLink to="/" activeClassName={"nav-active"} exact>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round"
                             stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <polyline points="5 12 3 12 12 3 21 12 19 12"/>
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
                        </svg>
                    </NavLink>
                </li>
                {localStorage.getItem("token") != null ? <>
                        <li>
                            <NavLink to="/diets" activeClassName={"nav-active"}>
                                <svg className="icon-reverse" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px"
                                     y="0px" viewBox="0 0 60 60">
                                    <g>
                                        <path d="M45.3,0h-3.7c-2.4,0-4.3,1.9-4.3,4v57.2c0,1.6,1.1,2.7,2.7,2.7h10.7c1.6,0,2.7-1.1,2.7-2.7v-24h1.1c2.4,0,4.3-1.9,4.3-4
                                        V11.7C58.7,5.3,52.5,0,45.3,0z M42.7,58.6V37.2H48v21.3L42.7,58.6L42.7,58.6z M53.3,32h-2.7h-8V5.3h2.7c4.3,0,7.7,2.9,8,6.4V32z"/>
                                        <path d="M29.3,0c-1.6,0-2.7,1.1-2.7,2.7v18.7h-5.3V2.7c0-1.6-1.1-2.7-2.7-2.7C17.1,0,16,1.1,16,2.7v18.7h-5.3V2.7
                                        C10.7,1.1,9.6,0,8,0S5.3,1.1,5.3,2.7V31c0,2.1,1.6,3.7,3.7,3.7h1.6v26.7c0,1.6,1.1,2.7,2.7,2.7H24c1.6,0,2.7-1.1,2.7-2.7V34.6h1.6
                                        c1.9,0,3.7-1.6,3.7-3.7V2.7C32,1.1,30.9,0,29.3,0z M21.3,58.6H16v-24h5.3V58.6z M26.7,29.3h-16v-2.7h16V29.3z"/>
                                    </g>
                                </svg>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/timetable" activeClassName={"nav-active"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round"
                                     stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <rect x="4" y="4" width="16" height="16" rx="2"/>
                                    <line x1="4" y1="12" x2="20" y2="12"/>
                                    <line x1="12" y1="4" x2="12" y2="20"/>
                                </svg>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/more" activeClassName={"nav-active"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round"
                                     stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <line x1="4" y1="6" x2="20" y2="6"/>
                                    <line x1="4" y1="12" x2="20" y2="12"/>
                                    <line x1="4" y1="18" x2="20" y2="18"/>
                                </svg>
                            </NavLink>
                        </li>
                    </>
                    : <li>
                        <NavLink to="/login" activeClassName={"nav-active"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round"
                                 stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path
                                    d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"/>
                                <path d="M20 12h-13l3 -3m0 6l-3 -3"/>
                            </svg>
                        </NavLink>
                    </li>
                }
            </ul>
        </nav>
    )
}

export default Nav