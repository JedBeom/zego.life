import React, {Fragment, useEffect, useState} from 'react'
import Calendar from 'react-calendar'
import DietCard from '../components/DietCard'
import LoadingCard from '../components/LoadingCard'
import {getD2UByDiet, getDietByDate} from '../common/api'
import 'react-calendar/dist/Calendar.css';

const DietPage = () => {
    let now = new Date()
    let maxDate = new Date()
    maxDate.setDate(31)
    if (now.getDate() >= 28) {
        maxDate.setDate(7)
        maxDate.setMonth(now.getMonth() + 1)
    }

    let minDate = new Date()
    minDate.setDate(1)

    const formatMonthYear = () => {
        return (locale, date) => date.getFullYear() + "년 " + (date.getMonth() + 1) + "월"
    }

    const [diets, setDiets] = useState([])
    const [applieds, setApplieds] = useState([])
    const [isLoading, setLoading] = useState(true)
    const getDietOnClick = async (value, event) => {
        setDiets([])
        setApplieds([])
        setLoading(true)
        try {
            let ds = await getDietByDate(value)
            if (localStorage.getItem("token") != null) {
                let aps = []
                for (let i = 0; i < 3; i++) {
                    let applied = await getD2UByDiet(ds[i].ID)
                    aps.push(applied)
                }
                setApplieds(aps)
            }
            setDiets(ds)
        } catch (e) {
            alert(e)
        }
        setLoading(false)
    }

    useEffect(() => {
        getDietOnClick(now, undefined)
    }, [])

    return (
        <Fragment>
            <article className={`card-box shadow-3 hover-shift-t-3 ease-300`}>
                <h2 className={"card-title font-s-core px-2"}>🍳 날짜를 선택하세요</h2>
                <Calendar onChange={getDietOnClick} className={"calendar mt-6"} formatMonthYear={formatMonthYear()}
                          defaultValue={now} minDate={minDate} maxDate={maxDate} minDetail={"month"}
                          maxDetail={"month"}/>
            </article>
            {isLoading ? <LoadingCard/> : diets.map((value, index) => {
                return <DietCard diet={value} applied={applieds[index]}/>
            })}
        </Fragment>
    )
}

export default DietPage