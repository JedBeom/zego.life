import React, {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import DietCard from '../../components/DietCard'
import DormInspector from '../../components/DormInspector'
import {getD2UByDiet, getDietByDate, getEventsByDate, getEventsDateOnly} from '../../common/api'
import {eventMake} from '../../utils/eventsMake'
import {timestampDot, timestampHyphen} from '../../utils/timestamp'
import CalendarIcon from '../../icons/Calendar'
import {ErrorBox, InfoBox} from "../../components/AlertBox"

import "react-datepicker/dist/react-datepicker.css";
import "../../styles/calendar.css"

const DietPage = () => {
    let now = new Date()
    let maxDate = new Date()
    maxDate.setMonth(now.getMonth() + 1)
    if (now.getDate() >= 28) {
        if (now.getMonth() === 11) { // if December
            maxDate.setMonth(0) // set January
        } else {
            maxDate.setMonth(now.getMonth() + 1)
        }
        maxDate.setDate(7)
    } else {
        maxDate.setDate(0) // last day of this month
    }

    let minDate = new Date()
    minDate.setDate(now.getDate() - 7)

    const [diets, setDiets] = useState([])
    const [applieds, setApplieds] = useState([undefined, undefined, undefined])
    const [isLoading, setLoading] = useState(false)
    const [date, setDate] = useState(now)
    const [dates, setDates] = useState(null)
    const [events, setEvents] = useState([])

    const [errMsg, setErrMsg] = useState("")
    const onClick = async (d) => {
        if (d === undefined || d === null || d === date) {
            return
        }

        getEvents(timestampHyphen(d))
        setDate(d)
        setDiets([])
        setApplieds([undefined, undefined, undefined])
        setLoading(true)
        try {
            let ds = await getDietByDate(timestampDot(d))
            setDiets(ds)
            setLoading(false)
            if (localStorage.getItem("token") != null) {
                let aps = [...applieds]
                for (let i = 0; i < 3; i++) {
                    aps[i] = await getD2UByDiet(ds[i].ID)
                }
                setApplieds(aps)
            }
        } catch (e) {
            setErrMsg("불러오는 중 문제가 발생했어요.")
        }
    }

    const getDates = async () => {
        let ds = await getEventsDateOnly()
        for (let i = 0; i < ds.length; i++) {
            ds[i] = new Date(ds[i])
        }
        setDates(ds)
    }

    const getEvents = async date => {
        let events = await getEventsByDate(date)
        for (let i = 0; i < events.legnth; i++) {
            events[i] = eventMake(events[i])
        }
        setEvents(events)
    }

    useEffect(() => {
        document.title = "급식 | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
        let now = new Date()
        now.setHours(0, 0, 0, 0)
        onClick(now)
        getDates()
    }, [])

    if (dates === null) {
        return (<>
            <h1 className="page-title">캘린더</h1>
            <div className="loader"/>
        </>)
    }

    return (
        <>
            <h1 className="page-title">캘린더</h1>
            <InfoBox>2월 급식 신청 기간입니다. <a href="http://gwang.i-zone.kr" rel="noopener noreferrer" target="_blank">플라이키친
                가기</a></InfoBox>
            <ErrorBox>{errMsg}</ErrorBox>
            <article className={`card-box shadow-3`}>
                <h2 className={"card-title font-s-core px-2"}>
                    <CalendarIcon className="icon icon-tabler"/>
                    날짜 선택
                </h2>
                <DatePicker inline disabledKeyboardNavigation dateFormat="yyyy-MM-dd"
                            onChange={onClick} name="날짜 선택" title="날짜 선택" allowSameDay={false}
                            highlightDates={dates}
                            selected={date} minDate={minDate} maxDate={maxDate} todayButton="오늘"/>
            </article>
            {isLoading ? <div className="loader"/> : <>
                {events.length > 0 ?
                    <article className="card-box shadow-3">
                        <h2><CalendarIcon className="icon"/>일정</h2>
                        <ul>
                            {events.map((e, j) => (
                                <li key={j}>{e.Name}{e.badges}</li>
                            ))}
                        </ul>
                    </article>
                    : null}
                {diets.map((value, index) => {
                    return <DietCard key={index} diet={value} applied={applieds[index]}/>
                })}
                {localStorage.getItem("me.residence") === "1" ? <DormInspector date={date} correction={false}/> : null}
            </>
            }
        </>
    )
}

export default DietPage