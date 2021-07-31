import React, {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import {getD2UByDiet, getDietByDate, getEventsByDate, getEventsDateOnly} from '../../common/api'

import Page, {Title} from "../../components/Page"
import {ErrorBox} from "../../components/AlertBox"
import CardBox from "../../components/ui/CardBox"
import DietCard from '../../components/DietCard'
import DormInspector from '../../components/DormInspector'
import Loading from '../../components/ui/Loading';

import {eventMake} from '../../utils/eventsMake'
import {timestampDot, timestampHangulNoYear, timestampHyphen} from '../../utils/timestamp'
import CalendarIcon from '../../icons/Calendar'

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
    const [applieds, setApplieds] = useState(["-2", "-2", "-2"])
    const [isLoading, setLoading] = useState(true)
    const [date, setDate] = useState(now)
    const [dates, setDates] = useState([])
    const [events, setEvents] = useState([])

    const [errMsg, setErrMsg] = useState("")
    const onClick = async (d) => {
        if (d === undefined || d === null || d === date) {
            return
        }
        setErrMsg("")
        setLoading(true)

        getEvents(timestampHyphen(d))
        setDate(d)
        setDiets([])
        setApplieds(["-1", "-1", "-1"])
        try {
            let ds = await getDietByDate(timestampDot(d))
            setDiets(ds)
            setLoading(false)
            let aps = [...applieds]
            for (let i = 0; i < 3; i++) {
                aps[i] = await getD2UByDiet(ds[i].ID)
            }
            setApplieds(aps)
        } catch (e) {
            setErrMsg("불러오는 중 문제가 발생했어요.")
        }
    }

    const getDates = async () => {
        let ds = await getEventsDateOnly()
        if (ds == null) {
            ds = []
        }
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
        let now = new Date()
        now.setHours(0, 0, 0, 0)
        getDates()
        onClick(now)
        // eslint-disable-next-line
    }, [])

    return (
        <Page title={timestampHangulNoYear(date)} hideTitle loading={dates === null}>
            <Title>캘린더</Title>
            <ErrorBox>{errMsg}</ErrorBox>
            <CardBox>
                <div className="inline-calendar">
                    <DatePicker inline disabledKeyboardNavigation dateFormat="yyyy-MM-dd"
                                onChange={onClick} name="날짜 선택" title="날짜 선택" allowSameDay={false}
                                highlightDates={dates} className="inline-calendar"
                                selected={date} minDate={minDate} maxDate={maxDate} todayButton="오늘"/>
                </div>
            </CardBox>
            <Loading visible={isLoading}/>
            {!isLoading ?  <>
                {events.length > 0 ?
                    <CardBox>
                        <h2><CalendarIcon className="icon"/>일정</h2>
                        <ul>
                            {events.map((e, j) => (
                                <li key={j}>{e.Name}{e.badges}</li>
                            ))}
                        </ul>
                    </CardBox>
                    : null}
                {diets.map((value, index) => {
                    return <DietCard key={index} diet={value} applied={applieds[index]} hideDate/>
                })}
                {localStorage.getItem("me.residence") === "1" ? <DormInspector date={date} correction={false}/> : null}
            </> : null
            }
        </Page>
    )
}

export default DietPage