import {NavLink} from 'react-router-dom'

import {isUser} from "../utils/getRoles"

import CalendarIcon from '../icons/Calendar'
import BookmarksIcon from '../icons/Bookmarks'

import styled from 'styled-components'

const Nav = () => {
    return <NavStyled>
        <ul>
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
                        <NavLink to="/bookmarks" activeClassName={"nav-active"}>
                            <BookmarksIcon/>
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
    </NavStyled>
}

const NavStyled = styled.nav`
position: fixed;
bottom: 0;
left: 0;
right: 0;

padding-bottom: env(safe-area-inset-bottom, .75em);

box-shadow: 0px -20px 25px -5px rgba(0, 0, 0, 0.1), 0 -10px 10px -5px rgba(0, 0, 0, 0.04);

border-top-left-radius: 1.25rem;
border-top-right-radius: 1.25rem;

& ul {
    display: flex;
    justify-content: space-around;

    margin-left: auto;
    margin-right: auto;
    max-width: 600px;

    padding-top: .4em;
    padding-bottom: .2em;
    list-style: none;
    font-size: 1.3em;
    font-weight: 700;

    & li {
        margin-left: 0;
    }
}

& a {
    text-decoration: none;
    color: var(--nav-bar-default-color);
    display: inline-block;
    position: relative;
    transition: color 0.2s ease 0s, left 0.2s ease 0s;
}

& svg {
    height: 1.5em;
    stroke: var(--nav-bar-default-color);
    stroke-width: 2.5;
    fill: transparent;
}

& .nav-active svg {
    stroke: var(--nav-bar-active-color);
}
`

export default Nav