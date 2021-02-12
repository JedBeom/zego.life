import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

import Page from "../../components/Page"

import {isAdmin, isUser} from '../../utils/getRoles'

import TvIcon from '../../icons/Tv'

const Me = () => {
    useEffect(() => {
        document.title = "더보기 | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [])
    const [logoutLoading, setLogoutLoading] = useState(false)
    const [refreshLoading, setRefreshLoading] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem("theme"))

    if (!isUser()) {
        window.location = "/login"
        return
    }

    const logout = async () => {
        setLogoutLoading(true)
        try {
            await axios.get("logout")
        } catch (e) {
            alert("로그아웃 실패! 그러나 로그인 전 상태로 돌아갑니다.")
        }
        localStorage.clear()
        sessionStorage.clear()
        window.location = "/login"
    }

    const changeTheme = e => {
        setTheme(e.target.value)
        localStorage.setItem("theme", e.target.value)
        setRefreshLoading(true)
        window.location = "/more"
    }

    const refresh = () => {
        setRefreshLoading(true)
        sessionStorage.clear()
        window.location.reload()
    }

    let foot = <footer className="copyright">
        Made with
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon footer-icon">
            <path
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
        </svg>
        by
        <NavLink to="/about">06+17+19</NavLink>
    </footer>

    return (
        <Page head={<h1 className="page-title">더보기</h1>} foot={foot}>
            <article className="card-box shadow-3 card-box-me">
                <h2 className="card-box-title font-s-core">안녕하세요, {localStorage.getItem("me.name")} 님!</h2>
                <button className={logoutLoading ? "loading button float-right" : "button float-right"}
                        onClick={logout}>로그아웃
                </button>


            </article>
            <article className="card-box shadow-3">
                <h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler" viewBox="0 0 24 24">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    사이트 설정
                </h2>
                <div className="flex flex-column">
                    <label className="my-2">테마</label>
                    <select className="select br-round full" value={theme} onChange={changeTheme}>
                        <optgroup label="기본">
                            <option value="light">라이트</option>
                            <option value="dark">다크</option>
                        </optgroup>
                        <optgroup label="단색">
                            <option value="pink-55">핑크 0505</option>
                            <option value="pure-dark">퓨어 다크</option>
                            <option value="logo-blue">로고블루</option>
                        </optgroup>
                        <optgroup label="그라디언트">
                            <option value="linear-indigo">리니어 인디고</option>
                            <option value="linear-pink">리니어 핑크</option>
                            <option value="lonely-sky">론리 스카이</option>
                            <option value="clear-water">클리어 워터</option>
                            <option value="tropical-dark">트로피칼 다크</option>
                            <option value="pupple-mint-dark">퍼플 민트 다크</option>
                        </optgroup>
                        <optgroup label="스페셜">
                        </optgroup>
                    </select>
                    <label className="my-2">앱 새로고침</label>
                    <button onClick={refresh} className={refreshLoading ? "button loading" : "button"}>새로고침</button>
                </div>
            </article>
            <article className="card-box shadow-3">
                <h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler" viewBox="0 0 24 24">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                        <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"/>
                    </svg>
                    피드백 보내기
                </h2>
                <p>추가되었으면 하는 기능이나 불편한 점이 있나요? 피드백을 보내주세요!</p>
                <NavLink to="/help/feedback/">
                    <button className="button float-right">피드백</button>
                </NavLink>
            </article>
            <article className="card-box shadow-3">
                <h2><TvIcon/>청춘라디오 사연 보내기</h2>
                <p>2월 라디오 방송 시 사용됩니다.</p>
                <NavLink to="/radio/stories/post">
                    <button className="button float-right">사연 보내기</button>
                </NavLink>
            </article>
            <article className="card-box shadow-3">
                <h2>캠페인 신청하기</h2>
                <NavLink to="/campaigns">
                    <button className="button float-right">가기</button>
                </NavLink>
            </article>
            {isAdmin() ?
                <article className="card-box shadow-3">
                    <h2>어드민 페이지</h2>
                    <p>It's time to work...</p>
                    <NavLink to="/admin">
                        <button className="button float-right">일하러 가기</button>
                    </NavLink>
                </article>
                : null}
        </Page>
    )
}

export default Me