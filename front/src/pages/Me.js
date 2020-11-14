import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {isAdmin} from '../utils/getRoles'

const Me = () => {
    useEffect(() => {
        document.title = "내 페이지 | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [])
    const [isLoading, setLoading] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem("theme"))

    if (localStorage.getItem("token") === null) {
        window.location = "/login"
        return
    }

    const logout = async () => {
        setLoading(true)
        try {
            await axios.get("logout")
        } catch (e) {
            alert("로그아웃 실패! 그러나 로그인 전 상태로 돌아갑니다.")
        }
        localStorage.clear()
        sessionStorage.clear()
        window.location = "/login"
    }

    const onChange = e => {
        setTheme(e.target.value)
        localStorage.setItem("theme", e.target.value)
        window.location.reload()
    }

    return (
        <>
            <h1 className="page-title">내 페이지</h1>
            <article className="card-box shadow-3 card-box-me">
                <h2 className="card-box-title font-s-core">안녕하세요, {localStorage.getItem("me.name")} 님!</h2>
                <p>{isAdmin() ? "일해라 노예야" : "반가워요!"}</p>
                <button className={isLoading ? "loading button float-right" : "button float-right"}
                        onClick={logout}>로그아웃
                </button>


            </article>
            <article className="card-box shadow-3">
                <h2>사이트 설정</h2>
                <div className="flex flex-column">
                    <label className="my-2">테마</label>
                    <select className="select br-round full" value={theme} onChange={onChange}>
                        <optgroup label="기본">
                            <option value="light">라이트</option>
                            <option value="dark">다크</option>
                        </optgroup>
                        <optgroup label="그라디언트">
                            <option value="tropical">트로피칼 다크</option>
                            <option value="indigo">인디고</option>
                        </optgroup>
                        <optgroup label="스페셜">
                            {isAdmin() ? <option value="persona5">페르소나 5</option> : null}
                        </optgroup>
                    </select>
                    <p>테마 변경으로 앱 새로고침을 할 수 있습니다.</p>
                </div>
            </article>
            <article className="card-box shadow-3">
                <h2>피드백 보내기</h2>
                <p>추가되었으면 하는 기능이나 불편한 점이 있나요? 피드백을 보내주세요!</p>
                <NavLink to="/help/feedback/">
                    <button className="button float-right">피드백</button>
                </NavLink>
            </article>
            <footer className="copyright">
                Made with
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon footer-icon">
                    <path
                        d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
                </svg>
                by
                <NavLink to="/about">06+17+19</NavLink>
                <p className="gray-light dark-mode-explain"></p>
            </footer>
        </>
    )
}

export default Me