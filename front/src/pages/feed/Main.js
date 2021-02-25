import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import Page from '../../components/Page'
import {ErrorBox} from '../../components/AlertBox'

import {timestampHangul} from '../../utils/timestamp'

import MessageIcon from '../../icons/Message'
import PencilIcon from '../../icons/Pencil'
import CalendarIcon from '../../icons/Calendar'

const Main = () => {

    const [threads, setThreads] = useState([])
    const [errMsg, setErrMsg] = useState("")

    const getThreads = async () => {
        try {
            const {data} = await axios.get(`threads`, {
                params: {
                    limit: 50,
                    page: 1,
                }
            })
            if (data.Count === 0) {
                setErrMsg("스레드가 없습니다.")
                return
            }
            setThreads(data.Threads)
        } catch (e) {
            setErrMsg("불러오지 못했습니다.")
        }
    }

    useEffect(() => {
        getThreads()
    }, [])

    return <Page title="담벼락(베타)" loading={threads === []}>
        <Wrapper>
            <NavLink className="no-underline" to="/feed/about">
                <button className="button mb-3">담벼락이 무엇인가요?</button>
            </NavLink>
            <NavLink className="no-underline" to="/feed/post">
                <button className="button mb-3"><PencilIcon className="icon"/>담벼락에 글 쓰기</button>
            </NavLink>
            <ErrorBox>{errMsg}</ErrorBox>
            {threads.map((t, i) => {
                return (
                    <NavLink className="no-underline" to={`/feed/${t.ID}`}>
                        <Thread>
                            <h2>{t.Title}</h2>
                            <p><MessageIcon/>{t.CommentsNum}개</p>
                            <p><CalendarIcon className="icon"/>{timestampHangul(t.UpdatedAt, true)}</p>
                        </Thread>
                    </NavLink>
                )
            })}
        </Wrapper>
    </Page>
}

const Wrapper = styled.div`
`

const Thread = styled.article`
margin-bottom: 1em;
padding-bottom: 1em;
border-bottom: .1em solid;
`

export default Main