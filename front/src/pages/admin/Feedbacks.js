import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Page from '../../components/Page';
import {SuccessBox, WarningBox} from "../../components/AlertBox";

import {timestampHangul} from '../../utils/timestamp'

const Feedbacks = () => {
    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [fs, setFs] = useState([])

    const get = async () => {
        setErrMsg("")
        try {
            const {data} = await axios.get(`feedbacks`)
            if (data !== null) {
                setFs(data)
            }
        } catch (e) {
            setErrMsg(`로딩 실패. ${e}`)
        }
    }

    const setAnswer = async (f) => {
        setOkMsg("")
        setErrMsg("")
        let answer = window.prompt(`내용: ${f.Content}...에 답변하기`, f.Answer)
        if (answer == null) return
        f.Answer = answer
        try {
            await axios.patch(`feedbacks/${f.ID}`, f)
            setOkMsg("답변을 보냈어요.")
            await get()
        } catch (e) {
            setErrMsg(`답변 실패... ${e}`)
        }
    }

    useEffect(() => {
        get()
    }, [])

    return (
        <Page title="피드백 보기" back>
            <WarningBox>{errMsg}</WarningBox>
            <SuccessBox>{okMsg}</SuccessBox>
            {
                fs.map((f) =>
                    <article onClick={() => setAnswer(f)} key={f.ID} className="card-box shadow-3 feedback-box">
                        <p className="content">{f.Content} <span
                            className="by">— {f.User.Grade}-{f.User.Class} {f.User.Name}({timestampHangul(f.CreatedAt, true)})</span>
                        </p>
                        {f.Answer !== "" ? <p className="answer">답변: {f.Answer}</p> : null}
                    </article>
                )
            }
        </Page>
    )
}

export default Feedbacks