import React, {useEffect, useState} from 'react'
import {timestampDot} from '../utils/timestamp'
import axios from 'axios'
import CheckGreen from '../components/CheckGreen'
import {isUser} from "../utils/getRoles"
import {getDietReviewPossible} from '../common/api'

const DietReview = () => {
    const [id, setID] = useState("")
    const [rate, setRate] = useState(0)
    const [bestIndex, setBestIndex] = useState(0)
    const [dietWhen, setDietWhen] = useState("")
    const [menu, setMenu] = useState(["로딩 중"])
    const msg = [
        "별을 눌러보세요", "별로였어요", "좀 아쉬웠어요", "그럭저럭", "괜찮았어요", "최고였어요"
    ]
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const fetchPossible = async () => {
        if (!isUser()) {
            return
        }

        let d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        h += m / 60;

        let when = 0
        if (d.getDay() === 6 || d.getDay() === 0) {
            if (h >= 8 && h <= 10) { // 8시 ~ 10시 
                when = 1
                setDietWhen("아침")
            } else if (h >= 12.83 && h <= 14) { // 약 12시 50분 ~ 14시
                when = 2
                setDietWhen("점심")
            } else if (h >= 17.83 && h <= 19) { // 약 17시 50분 ~ 19시
                when = 3
                setDietWhen("저녁")
            } else {
                return
            }
        } else {
            if (h >= 7.33 && h <= 8.33) { // 약 7시 20분 ~ 약 8시 20분
                when = 1
                setDietWhen("아침")
            } else if (h >= 11.33 && h <= 12.33) { // 약 11시 20분 ~ 약 12시 20분
                when = 2
                setDietWhen("점심")
            } else if (h >= 17.5 && h <= 18.5) { // 17시 30분 ~ 18시 30분
                when = 3
                setDietWhen("저녁")
            } else {
                return
            }
        }

        let idd = timestampDot(d) + "-" + when
        setID(idd)

        try {
            let m = await getDietReviewPossible(idd)
            setMenu(m)
        } catch (e) {
        }
    }

    const submit = async () => {
        if (rate === 0) return

        setLoading(true)
        let d = {
            Rate: rate,
            BestIndex: bestIndex,
            BestMenu: menu[bestIndex]
        }

        try {
            await axios.post(`diet-reviews/${id}`, d)
            sessionStorage.setItem(`diet-reviews/${localStorage.getItem("me.id")}/${id}`, JSON.stringify([]))
            setSubmitted(true)
        } catch (e) {
            alert(e)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPossible()
    }, [])

    if (menu.length <= 1) {
        return null
    }

    return (
        <article className="card-box card-box-review shadow-3">
            <h2>급식 평가</h2>
            {!submitted ?
                <>
                    <p>오늘 <span className="diet-when">{dietWhen}</span> 어땠나요?</p>
                    <p className="rate">
                        {
                            [1, 2, 3, 4, 5].map((v) => (
                                <span key={v} onClick={() => setRate(v)}>{rate > v - 1 ? "★" : "☆"}</span>
                            ))
                        }
                    </p>
                    <p>{msg[rate]}</p>
                    <h2>최고의 메뉴를 골라주세요</h2>
                    <select className="select br-round full mt-2" value={bestIndex}
                            onChange={e => setBestIndex(Number(e.target.value))}>
                        {menu.map((v, i) => (
                            <option key={i} value={i}>{v}</option>
                        ))}
                    </select>
                    <button onClick={submit}
                            className={loading ? "button float-right mt-3 loading" : "button float-right mt-3"}>제출
                    </button>
                </>
                : <>
                    <CheckGreen/>
                    <p style={{display: "inline"}}>평가 완료!</p>
                </>
            }
        </article>
    )
}

export default DietReview