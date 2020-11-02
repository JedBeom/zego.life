import React, {Suspense, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import LoadingCard from '../components/LoadingCard'
import DietCard from "../components/DietCard"
import DdayCounter from "../components/DdayCounter"

import {getD2UByDiet, getDietByDate} from '../common/api'
import {timestampDot} from '../utils/timestamp'
import whatMeal from '../utils/whatMeal'

const AddToHome = React.lazy(() => import("../components/AddToHome"))
const DormInspector = React.lazy(() => import("../components/DormInspector"))

const Main = () => {
    const [diet, setDiet] = useState({when: "", dietList: [], isLoading: true})
    const [applied, setApplied] = useState(-1)
    const [expired, setExpired] = useState(false)
    const history = useHistory()
    useEffect(() => {
        if (expired) {
            history.push("/help/token-expired")
        }
        // eslint-disable-next-line
    }, [expired])
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
                if (e.response.status === 401) {
                    setExpired(true)
                }
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

        fetchDiet()
		fetchD2U()
    }, [])

    return (
        <>
            <h1 className="page-title">시작</h1>
            <Suspense fallback={null}>
                <AddToHome/>
            </Suspense>
            <DdayCounter/>
            {diet.isLoading
                ? <LoadingCard/>
                : <DietCard diet={diet} applied={applied}/>}
            <Suspense fallback={null}>
                <DormInspector/>
            </Suspense>
        </>
    )
}


export default Main
