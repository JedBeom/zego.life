import React, {Fragment, useEffect, useState} from 'react'
import LoadingCard from '../components/LoadingCard'
import DietCard from "../components/DietCard";

import {getD2UByDiet, getDietByDate} from '../common/api'
import {timestampDot} from '../utils/timestamp'
import whatMeal from '../utils/whatMeal'

const Main = () => {
    const [diet, setDiet] = useState({when: "웬?", dietList: [], isLoading: true})
    const [applied, setApplied] = useState(false)
    useEffect(() => {
        document.title = "제고라이프"

        const fetchDiet = async () => {
            try {
                let ds = await getDietByDate(timestampDot(new Date()))
                setDiet(ds[whatMeal()])
            } catch (e) {
                alert(e)
            }
        };

        const fetchD2U = async () => {
            try {
                let dietID = timestampDot(new Date()) + "-" + (whatMeal() + 1)
                let ap = await getD2UByDiet(dietID)
                setApplied(ap)
            } catch (e) {
                alert(e)
            }
        }

        fetchDiet();
        if (localStorage.getItem("token") != null) {
            fetchD2U()
        }
    }, [])

    return (
        <Fragment>
            {diet.isLoading
                ? <LoadingCard/>
                : <DietCard diet={diet} applied={applied}/>}
        </Fragment>
    )
}


export default Main