import React, {Fragment, useEffect, useState} from 'react'
import DatePicker from 'react-datepicker'
import DietCard from '../components/DietCard'
import LoadingCard from '../components/LoadingCard'
import {getD2UByDiet, getDietByDate} from '../common/api'
import {timestampDot} from '../utils/timestamp'
import "react-datepicker/dist/react-datepicker.css";

const DietPage = () => {
    let now = new Date()
    let maxDate = new Date()
    maxDate.setMonth(now.getMonth() + 1)
    if (now.getDate() >= 28) {
        maxDate.setMonth(now.getMonth() + 1)
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
    const getDietOnClick = async (d) => {
        if (d === undefined || d === null || d === date) {
            return
        }

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
            alert(e)
        }
    }

    useEffect(() => {
        document.title = "급식 | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
        getDietOnClick(new Date())
    }, [])

    return (
        <Fragment>
            <h1 className="page-title">급식</h1>
            <article className={`card-box shadow-3 diet-page`}>
                <h2 className={"card-title font-s-core px-2"}>
                    <svg className={"icon mr-3"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480">
                        <path
                            d="M189.667,263.5a32.4,32.4,0,0,1-11.334,0,23.907,23.907,0,0,1-8.6,6.441L174.246,288h12.81l9.459-18.918A23.918,23.918,0,0,1,189.667,263.5Z"/>
                        <path
                            d="M296,312A32,32,0,0,0,315.2,254.4L312,252V240c0-13.009-7.327-24-16-24s-16,10.991-16,24v12l-3.195,2.4A32,32,0,0,0,296,312Zm0-48a16,16,0,1,1-16,16A16,16,0,0,1,296,264Z"/>
                        <path
                            d="M448,168H32V456H448ZM264,244.218V240c0-22.056,14.355-40,32-40s32,17.944,32,40v4.218A47.567,47.567,0,0,1,344,280a48,48,0,0,1-96,0A47.567,47.567,0,0,1,264,244.218Zm-111.256-19.1a32.005,32.005,0,0,1,62.512,0,24,24,0,0,1-2.021,46.3l-14.08,28.16A8,8,0,0,1,192,304H168a8,8,0,0,1-7.761-6.06l-6.708-26.833a24,24,0,0,1-.787-45.986ZM360,400a8,8,0,0,1-11.578,7.155l-43.016-21.508C293.5,396.284,258.407,424,216,424c-24.623,0-47.9-4.416-65.535-12.433C130.819,402.638,120,390.006,120,376s10.819-26.638,30.465-35.567C168.1,332.416,191.377,328,216,328c42.407,0,77.5,27.716,89.406,38.353l43.016-21.508A8,8,0,0,1,360,352Z"/>
                        <polygon points="344 387.056 344 364.944 321.889 376 344 387.056"/>
                        <path
                            d="M160,256a7.989,7.989,0,0,0,7.387-4.925,8,8,0,0,1,10.462-4.3,16.113,16.113,0,0,0,12.3,0,7.992,7.992,0,0,1,10.462,4.3A8,8,0,1,0,208,240a8,8,0,0,1-8-8,16,16,0,0,0-32,0,8,8,0,0,1-8,8,8,8,0,0,0,0,16Z"/>
                        <path
                            d="M162.964,352.574a8.013,8.013,0,1,1-10.48,4.707C142.074,362.912,136,369.726,136,376c0,7.149,7.883,15,21.085,21a115.263,115.263,0,0,0,24.445,7.666C186.2,396.406,192,384.218,192,376c0-8.149-5.866-20.451-10.484-28.664A123.478,123.478,0,0,0,162.964,352.574Z"/>
                        <path
                            d="M198.385,344.838C203.029,353.862,208,365.882,208,376s-4.971,22.138-9.615,31.162C204.1,407.71,210,408,216,408c33.867,0,63.577-21.508,76.054-32-12.477-10.492-42.187-32-76.054-32C210,344,204.1,344.29,198.385,344.838Z"/>
                        <path
                            d="M368,72V48a8,8,0,0,1,16,0v8h16V48a24,24,0,0,0-48,0V72H304V48a8,8,0,0,1,16,0v8h16V48a24,24,0,0,0-48,0V72H160V48a8,8,0,0,1,16,0v8h16V48a24,24,0,0,0-48,0V72H96V48a8,8,0,0,1,16,0v8h16V48a24,24,0,0,0-48,0V72H32v80H448V72Z"/>
                    </svg>
                    날짜를 선택하세요
                </h2>
                <div className="inline-calendar">
                    <DatePicker inline disabledKeyboardNavigation dateFormat="yyyy-MM-dd"
                                onChange={getDietOnClick}
                                selected={date} minDate={minDate} maxDate={maxDate} todayButton="오늘"/>
                </div>
            </article>
            {isLoading ? <LoadingCard/> : diets.map((value, index) => {
                return <DietCard key={index} diet={value} applied={applieds[index]}/>
            })}
        </Fragment>
    )
}

export default DietPage