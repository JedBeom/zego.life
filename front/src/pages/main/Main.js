import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

import {getD2UByDiet, getDDay, getDietByDate} from '../../common/api'
import {timestampDot} from '../../utils/timestamp'
import whatMeal from '../../utils/whatMeal'
import {isUser} from "../../utils/getRoles"

import Page from "../../components/Page"
import DietCard from "../../components/DietCard"
import DdayCounter from "../../components/DdayCounter"
import DietReview from '../../components/DietReview'
import DormInspector from "../../components/DormInspector"
import {InfoBox} from '../../components/AlertBox'

import AddToHome from "../../components/AddToHome"
import CampaignBox from "../../components/CampaignBox"

const Main = () => {
    const [loading, setLoading] = useState(true)
    const [diet, setDiet] = useState({when: "", dietList: []})
    const [campaign, setCampaign] = useState({Title: "로딩 중..."})
    const [userUpgradable, setUserUpgradable] = useState(false)
    const [dday, setDDay] = useState([])
    const [applied, setApplied] = useState(-1)
    const [noticeTitle, setNoticeTitle] = useState("로딩 중...")
    const [isFocused, setFocused] = useState(true)
    const [dietID, setDietID] = useState("")

    const onBlur = () => setFocused(false)
    const onFocus = () => setFocused(true)

    useEffect(() => {
        document.title = "제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [])

    useEffect(() => {
        window.addEventListener("blur", onBlur)
        window.addEventListener("focus", onFocus)
        return () => {
            window.removeEventListener("blur", onBlur)
            window.addEventListener("focus", onFocus)
        }
    }, [])

    useEffect(() => {
        if (!isFocused) return
        setLoading(true)

        let day = new Date()
        if (day.getHours() + (day.getMinutes() / 60) > 18.5) {
            day.setDate(day.getDate() + 1)
        }

        let dietIDnow = timestampDot(day) + "-" + (whatMeal() + 1)
        if (dietID === dietIDnow) {
            setLoading(false)
            return
        }

        const fetchDiet = async () => {
            try {
                let ds = await getDietByDate(timestampDot(day))
                setDiet(ds[whatMeal()])
            } catch (e) {
            }
            setLoading(false)
        };


        const fetchD2U = async () => {
            setDietID(dietIDnow)
            if (!isUser()) {
                return
            }
            try {
                let ap = await getD2UByDiet(dietIDnow)
                setApplied(ap)
            } catch (e) {
            }
        }

        const fetchHome = async () => {
            try {
                const {data} = await axios.get(`home`)
                setNoticeTitle(data.NoticeTitle)
                localStorage.setItem("me.roles", data.Roles)
                setCampaign(data.Campaign)
                setUserUpgradable(data.UserUpgradable)
            } catch (e) {
                setNoticeTitle(`로딩 실패 ${e}`)
            }
        }

        const fetchDDay = async () => {
            setDDay(await getDDay())
        }


        fetchDiet()
        fetchD2U()
        fetchHome()
        fetchDDay()
    }, [isFocused])

    if (loading) {
        return <>
            <h1 className="page-title">홈</h1>
            <div className="loader"/>
        </>
    }

    return (
        <Page head={<>
            <h1 className="page-title">홈</h1>
            <NavLink to="/notice" className="no-underline">
                <div className="notice-line">
                    <div className="notice-line-badge">공지</div>
                    {noticeTitle}
                </div>
            </NavLink>
        </>}>
            {userUpgradable ?
                <NavLink to="/help/user-upgrade">
                    <InfoBox>
                        신학년 학번을 입력하세요!
                    </InfoBox></NavLink> : null
            }
            <AddToHome/>
            <DdayCounter events={dday}/>
            <CampaignBox c={campaign}/>
            <DietReview a={isFocused}/>
            <DietCard diet={diet} applied={applied}/>
            {localStorage.getItem("me.residence") === "1" ?
                <DormInspector date={new Date()} correction={false}/> : null}
        </Page>
    )
}


export default Main
