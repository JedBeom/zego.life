import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import DietCard from "../components/DietCard"
import DdayCounter from "../components/DdayCounter"

import {getD2UByDiet, getDietByDate} from '../common/api'
import {timestampDot} from '../utils/timestamp'
import whatMeal from '../utils/whatMeal'

import DietReview from '../components/DietReview'

import AddToHome from "../components/AddToHome"

const Main = () => {
    const [loading, setLoading] = useState(true)
    const [diet, setDiet] = useState({when: "", dietList: []})
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
        console.log({dietID, dietIDnow})

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
            if (localStorage.getItem("token") === null) {
                return
            }
            try {
                let ap = await getD2UByDiet(dietIDnow)
                setApplied(ap)
            } catch (e) {
            }
        }

        const fetchNoticeLastTitle = async () => {
            try {
                const {data} = await axios.get(`notices/last`)
                setNoticeTitle(data.Title)
            } catch (e) {
                setNoticeTitle(`로딩 실패 ${e}`)
            }
        }

        fetchDiet()
        fetchD2U()
        fetchNoticeLastTitle()

    }, [isFocused])

    if (loading) {
        return <>
            <h1 className="page-title">시작</h1>
            <div className="loader"/>
        </>
    }

    return (
        <>
            <h1 className="page-title">시작</h1>
            <NavLink to="/notice">
                <div className="notice">
                    <div className="notice-badge inline-block bg-pink-dark green-lightest fs-s2 br-round">공지</div>
                    {noticeTitle}
                </div>
            </NavLink>
            <AddToHome/>
            <DdayCounter/>
            <DietCard diet={diet} applied={applied}/>
            <DietReview a={isFocused}/>
        </>
    )
}


export default Main
