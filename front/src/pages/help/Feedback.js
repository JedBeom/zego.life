import React, {useEffect, useState} from 'react'
import Back from '../../components/Back'
import axios from 'axios'

const Feedback = () => {
    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const [feedbacks, setFeedbacks] = useState([])

    const get = async () => {
        setErrMsg("")
        try {
            const {data} = await axios.get(`feedbacks/${localStorage.getItem("me.id")}`)
            setFeedbacks(data)
        } catch (e) {
            setErrMsg(`내 피드백을 불러오지 못했어요. ${e}`)
        }
    }

    const submit = async () => {
        setLoading(true)
        setOkMsg("")
        setErrMsg("")

        if (content === "") {
            setErrMsg("빈 종이는 받지 않아요!")
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
        <>
            <h1 className="page-title"><Back content="피드백 보내기"/></h1>
            {okMsg !== "" ?
                <div className="mb-5 bg-green-lightest green px-5 py-3 br-3 border-l bw-6 bc-green">
                    {okMsg}
                </div> : null}
            {errMsg !== "" ?
                <div className="mb-5 bg-red-lightest red px-5 py-3 br-3 border-l bw-6 bc-red">
                    {errMsg}
                </div> : null}
            <p>제고라이프는 여러분의 피드백으로 발전합니다. 사용하면서 필요한 기능이나 불편한 점이 있다면
                서슴 없이 알려주세요.
            </p>
            <textarea className="mt-4 textarea" rows="5" placeholder="당신의 의견을 알려주세요!" value={content}
                      onChange={e => setContent(e.target.value)}/>
            <button className={loading ? "button float-right mt-2 loading" : "button float-right mt-2"}
                    onClick={submit}>보내기!
            </button>
            <h2 className="page-title-sub">내 피드백</h2>
            {
                feedbacks.map((f) => (
                    <article className="card-box shadow-3">
                        {f.Content}
                    </article>
                ))
            }
        </>
    )
}

export default Feedback