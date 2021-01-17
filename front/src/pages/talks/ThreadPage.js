import React, {Fragment, useEffect, useState} from 'react'
import {ErrorBox, SuccessBox} from '../../components/AlertBox'
import Back from '../../components/Back'
import axios from 'axios'

import RefreshIcon from "../../icons/Refresh"

const ThreadPage = ({match}) => {
    const [thread, setThread] = useState(null)
    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [loading, setLoading] = useState(true)

    const [newComment, setNewComment] = useState("")

    const get = async () => {
        const {id} = match.params
        try {
            const {data} = await axios.get(`threads/${id}`)
            setThread(data)
        } catch (e) {
            setErrMsg("없는 스레드입니다.")
        }
        setLoading(false)
    }

    const addAnchor = (num) => {
        setNewComment(c => `#${num} ${c}`)
    }

    const postComment = async () => {
        setOkMsg("")
        setErrMsg("")
        setLoading(true)
        if (newComment === "") {
            setErrMsg("내용을 작성하세요.")
            return
        } else if (newComment.length < 5) {
            setErrMsg("너무 짧습니다.")
            return
        }

        const {id} = match.params
        let p = {
            Content: newComment,
        }
        try {
            await axios.post(`threads/${id}/comments`, p)
            setNewComment("")
            setOkMsg("코멘트 작성을 완료했습니다.")
        } catch (e) {
            setErrMsg(`코멘트 작성에 실패했습니다. ${e}`)
        } finally {
            setLoading(false)
            get()
        }
    }

    useEffect(() => {
        get()
    }, [])

    if (thread === null) {
        return (
            <>
                <h1 className="page-title"><Back content="스레드 보기"/></h1>
                {loading ? <div className="loader"/> : null}
                <ErrorBox>{errMsg}</ErrorBox>
            </>
        )
    }

    return (
        <>
            <h1 className="page-title"><Back content="스레드 보기"/></h1>
            <h2 className="mb-3" onClick={get}>{thread.Title} <RefreshIcon/></h2>
            {thread.Comments.map(c => {
                return (
                    <Fragment key={c.ID}>
                        {`#${c.Num}`}
                        <div className="card-box" onClick={() => addAnchor(c.Num)}>{c.Content}</div>
                    </Fragment>
                )
            })}
            <div className="flex flex-column mt-3">
                <label className="my-2">코멘트 내용</label>
                <textarea className="textarea" rows="5" placeholder="내용" value={newComment}
                          onChange={e => setNewComment(e.target.value)}/>
            </div>
            <ErrorBox>{errMsg}</ErrorBox>
            <SuccessBox>{okMsg}</SuccessBox>
            <button onClick={postComment} className="button float-right">작성</button>
        </>
    )

}

export default ThreadPage