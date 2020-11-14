import React, {useState} from 'react'
import axios from 'axios'

const NoticeNew = () => {
    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const submit = async () => {
        setLoading(true)
        let d = {
            Title: title,
            Content: content,
            Author: author
        }
        try {
            await axios.post(`notices`, d)
            setOkMsg("포스팅 완료")
            setTitle("")
            setContent("")
            setAuthor("")
        } catch (e) {
            setErrMsg(`실패... ${e}`)
        }
        setLoading(false)
    }

    return (
        <>
            <h1 className="page-title">새 공지사항</h1>
            {okMsg !== "" ?
                <div className="mb-5 bg-green-lightest green px-5 py-3 br-3 border-l bw-6 bc-green">
                    {okMsg}
                </div> : null}
            {errMsg !== "" ?
                <div className="mb-5 bg-red-lightest red px-5 py-3 br-3 border-l bw-6 bc-red">
                    {errMsg}
                </div> : null}
            <p>마크다운 형식으로 작성합니다.</p>
            <div className="flex flex-column">
                <label className="my-2">제목</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                       className="input"/>
            </div>
            <div className="flex flex-column">
                <label className="my-2">작성자</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)}
                       className="input"/>
            </div>
            <textarea className="mt-4 textarea" rows="5" placeholder="내용" value={content}
                      onChange={e => setContent(e.target.value)}/>
            <button className={loading ? "button float-right mt-2 loading" : "button float-right mt-2"}
                    onClick={submit}>보내기!
            </button>
        </>
    )
}

export default NoticeNew