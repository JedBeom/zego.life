import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {getD2UByDiet, getDDay, getDietByDate} from '../../common/api'

import Page from "../../components/Page"
import DietCard from "../../components/DietCard"
import DdayCounter from "../../components/DdayCounter"
import DietReview from '../../components/DietReview'
import DormInspector from "../../components/DormInspector"
import AddToHome from "../../components/AddToHome"
import CampaignBox from "../../components/CampaignBox"

import {timestampDot} from '../../utils/timestamp'
import whatMeal from '../../utils/whatMeal'
import {isUser} from "../../utils/getRoles"

const Main = () => {
    const [loading, setLoading] = useState(true)
    const [diet, setDiet] = useState({when: "", dietList: []})
    const [campaign, setCampaign] = useState(null)
    const [dday, setDDay] = useState([])
    const [ddayCount, setDDayCount] = useState(0)
    const [applied, setApplied] = useState(-1)
    const [noticeTitle, setNoticeTitle] = useState("로딩 중...")
    const [isFocused, setFocused] = useState(true)
    const [dietID, setDietID] = useState("")

    const onBlur = () => setFocused(false)
    const onFocus = () => setFocused(true)

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
        if (day.getHours() + (day.getMinutes() / 60) > 19.2) {
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
                setApplied(-2)
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
                setCampaign(data.Campaign)

                if (data.User.ID) {
                    if (data.User.EnterYear === 21 - data.User.Grade) {
                        window.location.href = "/help/user-upgrade"
                    }
                }
            } catch (e) {
                setNoticeTitle(`로딩 실패 ${e}`)
            }
        }

        const fetchDDay = async () => {
            try {
                const {es: dday, count} = await getDDay()
                setDDay(dday)
                setDDayCount(count)
            } catch (e) {

            }
        }

        fetchDiet()
        fetchD2U()
        fetchHome()
        fetchDDay()
        // eslint-disable-next-line
    }, [isFocused])

    return (
        <Page title="홈" loading={loading}>
            <NavLink to="/notice" className="no-underline">
                <div className="notice-line">
                    <div className="notice-line-badge">공지</div>
                    {noticeTitle}
                </div>
            </NavLink>
            <AddToHome/>
            <DdayCounter events={dday} count={ddayCount}/>
            <CampaignBox c={campaign}/>
            <DietReview a={isFocused}/>
            <DietCard diet={diet} applied={applied}/>
            {localStorage.getItem("me.residence") === "1" ?
                <DormInspector date={new Date()} correction={true}/> : null}
        </Page>
    )
}


export default Main
