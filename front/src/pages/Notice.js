import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {isAdmin} from "../utils/getRoles";
import NoticeCard from '../components/NoticeCard'
import axios from 'axios'

const Notice = () => {

    const [errMsg, setErrMsg] = useState("")
    const [notices, setNotices] = useState([{Title: ""}])

    const get = async () => {
        try {
            const {data} = await axios.get(`notices`)

            if (data === null) {
                setNotices([{Title: "공지가 없어요 ㅠ"}])
                return
            }

            let ns = []
            data.map(e => {
                e.date = new Date(e.CreatedAt)
                e.year = e.date.getFullYear()
                e.month = e.date.getMonth() + 1
                e.day = e.date.getDate()
                ns.push(e)
                return null
            })
            setNotices(ns)
        } catch (e) {
            setErrMsg(`공지사항을 불러올 수 없습니다. ${e}`)
        }
    }

    useEffect(() => {
        get()
    }, [])

    return (
        <>
            <h1 className="page-title">공지사항</h1>
            {isAdmin() ?
                <NavLink to="/admin/notice-new">
                    <button className="button mb-6">글쓰기</button>
                </NavLink> : null
            }
            {errMsg !== "" ?
                <div className="mb-5 bg-red-lightest red px-5 py-3 br-3 border-l bw-6 bc-red">
                    {errMsg}
                </div> : null}
            {
                notices.map(e => {
                    return <NoticeCard key={e.Title} notice={e}/>
                })
            }
        </>
    )
}

export default Notice