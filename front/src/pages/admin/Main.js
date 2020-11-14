import React from 'react'
import {NavLink} from 'react-router-dom'

const Main = () => {
    return (
        <>
            <h1 className="page-title">어드민</h1>
            <ul>
                <li><NavLink to="/admin/pw-change">암호 변경 토큰 생성</NavLink></li>
                <li><NavLink to="/admin/notice-new">새 공지사항</NavLink></li>
            </ul>
        </>
    )
}

export default Main