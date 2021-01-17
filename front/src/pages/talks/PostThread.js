import React, {useState} from 'react'
import axios from 'axios'
import {ErrorBox, SuccessBox} from '../../components/AlertBox'
import Back from "../../components/Back"

const PostThread = () => {

    const [title, setTitle] = useState("")
    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const submit = async e => {
        e.preventDefault()

        if (title.length < 4) {
            setErrMsg("주제가 너무 짧습니다.")
            setLoading(false)
            return
        }

        if (content.length < 5) {
            setErrMsg("코멘트 내용이 너무 짧습니다.")
            setLoading(false)
            return
        }

        let p = {
            Title: title,
            Content: content,
        }

        setLoading(true)
        try {
            await axios.post(`threads`, p)
            setOkMsg("스레드 개설 완료.")
            setTitle("")
            setContent("")
        } catch (e) {
            setErrMsg(`스레드 개설 실패. ${e}`)
        }
        setLoading(false)
    }

    return (
        <>
            <h1 className="page-title"><Back content="새 스레드 개설"/></h1>
            <form onSubmit={submit}>
                <div className="flex flex-column mt-3">
                    <label className="my-2">주제</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                           className="input" placeholder="스레드의 주제"/>
                </div>
                <div className="flex flex-column mt-3">
                    <label className="my-2">코멘트 내용</label>
                    <textarea className="textarea" rows="5" placeholder="내용" value={content}
                              onChange={e => setContent(e.target.value)}/>
                </div>
                <SuccessBox>{okMsg}</SuccessBox>
                <ErrorBox>{errMsg}</ErrorBox>
                <button className={loading ? "button float-right mt-2 loading" : "button float-right mt-2"}
                        type="submit">보내기!
                </button>
            </form>
        </>
    )
}

export default PostThread