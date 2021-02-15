import React, {useEffect, useState} from 'react'
import Back from "../../components/Back"
import {SuccessBox, WarningBox} from "../../components/AlertBox"
import axios from 'axios'

const NoticeNew = ({match}) => {
    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [isNew, setIsNew] = useState(true)
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const submit = async (d) => {
        await axios.post(`notices`, d)
    }

    const patch = async (d) => {
        const {id} = match.params
        await axios.patch(`notices/${id}`, d)
    }

    const onClick = async () => {
        setErrMsg("")
        setLoading(true)
        let d = {
            Title: title,
            Content: content,
            Author: author
        }
        try {
            if (isNew) {
                await submit(d)
                setOkMsg("포스팅 완료")
            } else {
                await patch(d)
                setOkMsg("수정 완료")
            }
        } catch (e) {
            setErrMsg(`실패... ${e}`)
            return
        } finally {
            setLoading(false)
        }

        setTitle("")
        setContent("")
        setAuthor("")
    }

    const get = async (id) => {
        try {
            const {data} = await axios.get(`notices/${id}`)
            setTitle(data.Title)
            setContent(data.Content)
            setAuthor(data.Author)
        } catch (e) {
            setErrMsg(`로딩 실패... ${e}`)
        }
    }

    useEffect(() => {
        const {id} = match.params
        if (id === "" || id === undefined) {
            return
        }
        setIsNew(false)
        setTitle("로딩 중!!!!")
        get(id)
    }, [match.params])

    return (
        <>
            <h1 className="page-title"><Back content="새 공지사항"/></h1>
            <SuccessBox>{okMsg}</SuccessBox>
            <WarningBox>{errMsg}</WarningBox>
            <p>마크다운 형식으로 작성합니다.</p>
            <div className="flex flex-column">
                <label className="my-2">제목</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                       className="input" placeholder="제목"/>
            </div>
            <div className="flex flex-column">
                <label className="my-2">작성자</label>
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)}
                       className="input" placeholder="멋진 이름"/>
            </div>
            <div className="flex flex-column">
                <label className="my-2">본문</label>
                <textarea className="textarea" rows="5" placeholder="내용" value={content}
                          onChange={e => setContent(e.target.value)}/>
            </div>
            <button className={loading ? "button float-right mt-2 loading" : "button float-right mt-2"}
                    onClick={onClick}> {isNew ? "글 제출" : "수정하기"}
            </button>
        </>
    )
}

export default NoticeNew