import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Page from '../../components/Page';
import {SuccessBox, WarningBox} from "../../components/AlertBox";
import FeedbackBox from '../../components/FeedbackBox';
import Loading from '../../components/ui/Loading';

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
            <Loading visible={!fs}/>
            <WarningBox>{errMsg}</WarningBox>
            <SuccessBox>{okMsg}</SuccessBox>
            {
                fs.map((f) => <FeedbackBox f={f} setAnswer={setAnswer}/>)
            }
        </Page>
    )
}

export default Feedbacks