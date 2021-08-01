import { useState } from 'react';
import {NavLink} from 'react-router-dom'
import axios from 'axios'

import Page from "../../components/Page"
import CardBox from '../../components/ui/CardBox'
import {MoreBox, MoreBoxContainer} from '../../components/MoreBox'

import {isAdmin, isUser} from '../../utils/getRoles'

import SendIcon from '../../icons/Send'
import AdIcon from '../../icons/Ad'
import LockAccessIcon from '../../icons/LockAccess'
import SpeakerphoneIcon from '../../icons/Speakerphone'
import SettingsIcon from '../../icons/Settings'
import HeartIcon from '../../icons/Heart'

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
        Made with <HeartIcon/>by <NavLink to="/about">팀 제고라이프</NavLink>
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
                <MoreBox icon={<SpeakerphoneIcon/>} title="공지사항" to="/notices"/>
                <MoreBox icon={<SendIcon/>} title="피드백" to="/help/feedback"/>
                <MoreBox icon={<AdIcon/>} title="캠페인" to="/campaigns"/>
                {isAdmin() ? <MoreBox icon={<LockAccessIcon/>} title="관리" to="/admin"/> : null}
                <MoreBox icon={<SettingsIcon/>} title="설정" to="/settings"/>
            </MoreBoxContainer>
        </Page>
    )
}

export default More