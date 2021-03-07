import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Page from '../../components/Page'
import {SuccessBox, WarningBox} from "../../components/AlertBox";
import FeedbackBox from '../../components/FeedbackBox';

const Feedback = () => {
    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const [feedbacks, setFeedbacks] = useState([])

    const get = async () => {
        setErrMsg("")
        try {
            const {data} = await axios.get(`users/${localStorage.getItem("me.id")}/feedbacks`)
            if (data != null) {
                setFeedbacks(data)
            }
        } catch (e) {
            setErrMsg(`내 피드백을 불러오지 못했어요. ${e}`)
        }
    }

    const submit = async () => {
        setLoading(true)
        setOkMsg("")
        setErrMsg("")

        if (content.replace(/\s/g, '') === "") {
            setErrMsg("내용을 작성해주세요.")
            setLoading(false)
            return
        } else if (content.length < 2) {
            setErrMsg("너무 짧습니다.")
            setLoading(false)
            return
        } else if (content.length > 150) {
            setErrMsg("제고라이프를 향한 큰 관심은 감사하지만, 내용이 너무 깁니다. 150자 미만으로 작성해 주십시오.")
            setLoading(false)
            return
        }

        let p = {
            Content: content
        }

        try {
            await axios.post(`feedbacks`, p)
            setOkMsg("보내주신 의견 감사히 읽어보겠습니다!")
            setContent("")
        } catch (e) {
            setErrMsg("피드백 전송에 실패했어요. 인터넷 연결 상황을 확인해보세요.")
        }
        setLoading(false)

        get()
    }

    useEffect(() => {
        get()
    }, [])

    return (
        <Page title="피드백 보내기" back>
            <SuccessBox>{okMsg}</SuccessBox>
            <WarningBox>{errMsg}</WarningBox>
            <p>제고라이프는 여러분의 피드백으로 발전합니다. 사용하면서 필요한 기능이나 불편한 점이 있다면
                서슴 없이 알려주세요.
            </p>
            <textarea className="mt-4 textarea" rows="5" placeholder="당신의 의견을 알려주세요!" value={content}
                      onChange={e => setContent(e.target.value)}/>
            <button className={loading ? "button float-right mt-2 loading" : "button float-right mt-2"}
                    onClick={submit}>보내기!
            </button>
            <h2 className="page-title-sub">내가 보낸 피드백</h2>
            {
                feedbacks.map((f) => <FeedbackBox f={f}/>)
            }
        </Page>
    )
}

export default Feedback