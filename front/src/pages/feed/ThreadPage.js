import React, {Fragment, useEffect, useState} from 'react'
import axios from 'axios'

import Page from '../../components/Page'
import {ErrorBox, SuccessBox} from '../../components/AlertBox'
import styled from 'styled-components'

const AnchorHighlight = (content) => {
    return content.split(" ").map((e, i) => {
        if (/#\d+/.test(e)) {
            return <Fragment key={i + "anchor"}><a href={e}>{e}</a> </Fragment>
        }

        return `${e} `
    })
}

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
        } else if (newComment.length < 6) {
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
        // eslint-disable-next-line
    }, [])

    if (thread === null) {
        return (
            <Page title="" back>
                {loading ? <div className="loader"/> : null}
                <ErrorBox>{errMsg}</ErrorBox>
            </Page>
        )
    }

    return (
        <Page title={thread.Title} backTo="/feed">
            {thread.Comments.map(c => {
                return (
                    <Comment id={c.Num} key={c.Num}>
                        {`#${c.Num}`}
                        <div className="card-box" onClick={() => addAnchor(c.Num)}>{AnchorHighlight(c.Content)}</div>
                    </Comment>
                )
            })}
            <div className="flex flex-column mt-3">
                <label className="my-2">아래에 쓰기</label>
                <textarea className="textarea" rows="5" placeholder="내용" value={newComment}
                          onChange={e => setNewComment(e.target.value)}/>
            </div>
            <ErrorBox>{errMsg}</ErrorBox>
            <SuccessBox>{okMsg}</SuccessBox>
            <button onClick={postComment} className="button float-right">덧붙이기</button>
        </Page>
    )

}

const Comment = styled.article`
white-space: pre-line;

&:before {
    content: '';
    display: block;
    position: relative;
    width: 0;
    height: 4em;
    margin-top: -4em;
}
`

export default ThreadPage