import React from 'react'
import {NavLink} from 'react-router-dom'

const Main = () => {
    return (
        <>
            <h1 className="page-title">어드민</h1>
            <ul>
                <li><NavLink to="/admin/users-all">사용자 열람</NavLink></li>
                <li><NavLink to="/admin/notice-new">새 공지사항</NavLink></li>
                <li><NavLink to="/admin/feedbacks">피드백 열람</NavLink></li>
                <li><NavLink to="/admin/campaign-new">캠페인 생성</NavLink></li>
                <li><NavLink to="/admin/dday-list">디데이 목록</NavLink></li>
            </ul>
        </>
    )
}

export default Main