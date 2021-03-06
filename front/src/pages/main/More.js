import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

import Page from "../../components/Page"
import CardBox from '../../components/ui/CardBox'
import {MoreBox, MoreBoxContainer} from '../../components/MoreBox'

import {isAdmin, isUser} from '../../utils/getRoles'

import SendIcon from '../../icons/Send'
import MicIcon from '../../icons/Mic'
import AdIcon from '../../icons/Ad'
import LockAccessIcon from '../../icons/LockAccess'
import SettingsIcon from '../../icons/Settings'

const More = () => {
    const [logoutLoading, setLogoutLoading] = useState(false)

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

    let foot = <footer className="copyright">
        Made with
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon footer-icon">
            <path
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
        </svg>
        by
        <NavLink to="/about">팀 제고라이프</NavLink>
    </footer>

    return (
        <Page title="더보기" foot={foot}>
            <CardBox>
                <h2>{localStorage.getItem("me.grade")}학년 {localStorage.getItem("me.class")}반 {localStorage.getItem("me.number")}번 {localStorage.getItem("me.name")}</h2>
                <button className={logoutLoading ? "loading button float-right" : "button float-right"}
                        onClick={logout}>로그아웃
                </button>
            </CardBox>
            <MoreBoxContainer>
                <MoreBox icon={<SendIcon/>} title="피드백" to="/help/feedback"/>
                <MoreBox icon={<MicIcon/>} title="라디오" to="/radio/stories/post"/>
                <MoreBox icon={<AdIcon/>} title="캠페인" to="/campaigns"/>
                {isAdmin() ? <MoreBox icon={<LockAccessIcon/>} title="관리" to="/admin"/> : null}
                <MoreBox icon={<SettingsIcon/>} title="설정" to="/settings"/>
            </MoreBoxContainer>
        </Page>
    )
}

export default More