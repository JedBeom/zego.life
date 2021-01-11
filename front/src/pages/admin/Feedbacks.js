import React, {useEffect, useState} from 'react'
import Back from "../../components/Back"
import {WarningBox} from "../../components/AlertBox";
import axios from 'axios'

const Feedbacks = () => {
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
        let answer = window.prompt(`내용: ${f.Content}...에 답변하기`, f.Answer)
        if (answer == null) return
        f.Answer = answer
        try {
            await axios.patch(`feedbacks/${f.ID}`, f)
            alert("OK")
            await get()
        } catch (e) {
            alert(`답변 실패... ${e}`)
        }
    }

    useEffect(() => {
        get()
    }, [])

    return (
        <>
            <h1 className="page-title"><Back content="피드백 열람"/></h1>
            <WarningBox>{errMsg}</WarningBox>
            {
                fs.map((f) =>
                    <article onClick={() => setAnswer(f)} key={f.ID} className="card-box shadow-3 feedback-box">
                        <p className="content">{f.Content} <span
                            className="by">— {f.User.Grade}-{f.User.Class} {f.User.Name}</span></p>
                        {f.Answer !== "" ? <p className="answer">답변: {f.Answer}</p> : null}
                    </article>
                )
            }
        </>
    )
}

export default Feedbacks