import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

import Page from "../../components/Page"
import NoticeCard from '../../components/NoticeCard'
import {ErrorBox} from '../../components/AlertBox';

import PencilIcon from "../../icons/Pencil"

import {isAdmin} from "../../utils/getRoles";

const Notice = () => {

    const [errMsg, setErrMsg] = useState("")
    const [notices, setNotices] = useState([])

    const get = async () => {
        try {
            const {data} = await axios.get(`notices`)

            if (!data) {
                setErrMsg("공지가 없습니다.")
                return
            }
            setNotices(data)
        } catch (e) {
            setErrMsg(`공지사항을 불러올 수 없습니다. ${e}`)
        }
    }

    useEffect(() => {
        get()
    }, [])

    return (
        <Page title="공지사항" loading={!notices} back>
            {isAdmin() ?
                <NavLink to="/admin/notice-new">
                    <button className="button mb-6">글쓰기</button>
                </NavLink> : null
            }
            <ErrorBox>{errMsg}</ErrorBox>
            {
                notices.map(e => {
                    return <NoticeCard key={e.Title} notice={e}>
                        {isAdmin() ? <NavLink to={`/admin/notice-new/${e.ID}`}>
                            <button className="button float-right"><PencilIcon className="icon icon-tabler"/>EDIT
                            </button>
                        </NavLink> : null}
                    </NoticeCard>
                })
            }
        </Page>
    )
}

export default Notice