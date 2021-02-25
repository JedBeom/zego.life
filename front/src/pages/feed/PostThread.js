import React, {useState} from 'react'
import axios from 'axios'

import Page from "../../components/Page"
import {ErrorBox, SuccessBox} from '../../components/AlertBox'

const PostThread = () => {

    const [title, setTitle] = useState("")
    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const submit = async e => {
        e.preventDefault()

        if (title.length < 4) {
            setErrMsg("담벼락 주제가 너무 짦아요...")
            setLoading(false)
            return
        }

        if (content.length < 5) {
            setErrMsg("내용이 너무 짧아요...")
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
            setOkMsg("담벼락에 글을 적었어요.")
            setTitle("")
            setContent("")
        } catch (e) {
            setErrMsg(`담벼락에 글을 적지 못했어요. ${e}`)
        }
        setLoading(false)
    }

    return (
        <Page title="담벼락에 글 쓰기" back>
            <form onSubmit={submit}>
                <div className="flex flex-column mt-3">
                    <label className="my-2">주제</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                           className="input" placeholder="담벼락의 주제"/>
                </div>
                <div className="flex flex-column mt-3">
                    <label className="my-2">내용</label>
                    <textarea className="textarea" rows="5" placeholder="내용" value={content}
                              onChange={e => setContent(e.target.value)}/>
                </div>
                <SuccessBox>{okMsg}</SuccessBox>
                <ErrorBox>{errMsg}</ErrorBox>
                <button className={loading ? "button float-right mt-2 loading" : "button float-right mt-2"}
                        type="submit">보내기!
                </button>
            </form>
        </Page>
    )
}

export default PostThread