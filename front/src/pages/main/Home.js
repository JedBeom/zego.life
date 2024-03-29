import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
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
import GoogleAd from '../../components/GoogleAd';
import { WarningBox } from '../../components/AlertBox';

const Home = ({history}) => {
    const [loading, setLoading] = useState(true)
    const [diet, setDiet] = useState()
    const [campaign, setCampaign] = useState(null)
    const [dday, setDDay] = useState([])
    const [ddayCount, setDDayCount] = useState(0)
    const [applied, setApplied] = useState(-1)
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
                setCampaign(data.Campaign)

                let lastNotice = localStorage.getItem("last_notice")
                if (data.User.ID) {
                    if (data.User.EnterYear === 21 - data.User.Grade) {
                        history.replace("/help/user-upgrade")
                        return
                    }

                    if (lastNotice !== data.NoticeID) {
                        localStorage.setItem("last_notice", data.NoticeID)
                        history.push(`/notices/${data.NoticeID}`)
                    }

                }
            } catch (e) {
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

        Promise.all([fetchDiet(), fetchD2U(), fetchHome(), fetchDDay()]).then(_ => setLoading(false))
        // eslint-disable-next-line
    }, [isFocused])

    return (
        <Page title="홈" loading={loading}>
            <WarningBox>
                제고라이프는 9월 1일부로 서비스를 종료합니다. <a href="closing-page/index.html" rel="noopener noreferrer" target="_blank">자세히 알아보기</a>
            </WarningBox>
            <AddToHome/>
            <DdayCounter events={dday} count={ddayCount}/>
            <GoogleAd/>
            <DietReview a={isFocused}/>
            <CampaignBox c={campaign}/>
            <DietCard diet={diet} applied={applied}/>
            {localStorage.getItem("me.residence") === "1" ?
                <DormInspector date={new Date()} correction={true}/> : null}
        </Page>
    )
}


export default withRouter(Home)
