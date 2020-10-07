import React, {Fragment, useEffect, useState} from 'react'
import LoadingCard from '../components/LoadingCard'
import DietCard from "../components/DietCard"
import DdayCounter from "../components/DdayCounter"

import {getD2UByDiet, getDietByDate} from '../common/api'
import {timestampDot} from '../utils/timestamp'
import whatMeal from '../utils/whatMeal'

const Main = () => {
    const [diet, setDiet] = useState({when: "", dietList: [], isLoading: true})
    const [applied, setApplied] = useState(-1)
    useEffect(() => {
        document.title = "제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
        
        let day = new Date()
        if (day.getHours() + (day.getMinutes() / 60) > 18.5 ) {
            day.setDate(day.getDate() + 1)
        }

        const fetchDiet = async () => {
            try {
                let ds = await getDietByDate(timestampDot(day))
                setDiet(ds[whatMeal()])
            } catch (e) {
                alert(e)
            }
        };

        const fetchD2U = async () => {
            try {
                let dietID = timestampDot(day) + "-" + (whatMeal() + 1)
                let ap = await getD2UByDiet(dietID)
                setApplied(ap)
            } catch (e) {
                alert(e)
            }
        }

        fetchDiet();
        if (localStorage.getItem("token") != null && diet.dietList.length > 1) {
            fetchD2U()
        }
    }, [])

    return (
        <Fragment>
            <h1 className="page-title">시작</h1>
            <DdayCounter/>
            {diet.isLoading
                ? <LoadingCard/>
                : <DietCard diet={diet} applied={applied}/>}
        </Fragment>
    )
}


export default Main