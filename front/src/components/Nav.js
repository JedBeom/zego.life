import React from 'react'
import {NavLink} from 'react-router-dom'
import {isUser} from "../utils/getRoles"
import CalendarIcon from '../icons/Calendar'

const Nav = () => {
    return (
        <nav>
            <ul className={"flex justify-around gray"}>
                <li>
                    <NavLink to="/" activeClassName={"nav-active"} exact>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <polyline points="5 12 3 12 12 3 21 12 19 12"/>
                            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
                            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
                        </svg>
                    </NavLink>
                </li>
                {isUser() ? <>
                        <li>
                            <NavLink to="/calendar" activeClassName={"nav-active"}>
                                <CalendarIcon/>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/timetable" activeClassName={"nav-active"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <rect x="4" y="4" width="16" height="16" rx="2"/>
                                    <line x1="4" y1="12" x2="20" y2="12"/>
                                    <line x1="12" y1="4" x2="12" y2="20"/>
                                </svg>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/more" activeClassName={"nav-active"}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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