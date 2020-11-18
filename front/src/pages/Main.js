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
    const [diet, setDiet] = useState({when: "", dietList: [], isLoading: true})
    const [applied, setApplied] = useState(-1)
    const [noticeTitle, setNoticeTitle] = useState("로딩 중...")
    useEffect(() => {
        document.title = "제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});

        let day = new Date()
        if (day.getHours() + (day.getMinutes() / 60) > 18.5) {
            day.setDate(day.getDate() + 1)
        }

        const fetchDiet = async () => {
            try {
                let ds = await getDietByDate(timestampDot(day))
                setDiet(ds[whatMeal()])
            } catch (e) {
            }
        };


        const fetchD2U = async () => {
			if (localStorage.getItem("token") === null) {
				return
            }
            try {
                let dietID = timestampDot(day) + "-" + (whatMeal() + 1)
                let ap = await getD2UByDiet(dietID)
                setApplied(ap)
            } catch (e) {
                alert(e)
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
    }, [])

    if (diet.isLoading) {
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
            <DietReview/>
        </>
    )
}


export default Main
