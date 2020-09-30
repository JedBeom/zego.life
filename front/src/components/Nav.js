import React from 'react'
import {NavLink} from 'react-router-dom'

const Nav = () => {
    return (
        <nav>
            <ul className={"flex justify-between gray"}>
                <li>
                    <NavLink to="/" activeClassName={"nav-active"} exact>시작</NavLink>
                </li>
                <li>/</li>
                <li>
                    <NavLink to="/diets" activeClassName={"nav-active"}>급식</NavLink>
                </li>
                <li>/</li>
                <li>
                    <NavLink to="/events" activeClassName={"nav-active"}>일정</NavLink>
                </li>
                <li>/</li>
                {localStorage.getItem("token") != null ?
                    <li>
                        <NavLink to="/me" activeClassName={"nav-active"}>{localStorage.getItem("me.name")} 님</NavLink>
                    </li>
                    : <li>
                        <NavLink to="/login" activeClassName={"nav-active"}>로그인</NavLink>
                    </li>
                }
            </ul>
        </nav>
    )
}

export default Nav