import React, {useEffect, useState} from 'react'
import UserBox from '../../components/UserBox'
import axios from 'axios'
import {ErrorBox, InfoBox, SuccessBox} from '../../components/AlertBox'
import Back from "../../components/Back"
import copy from "../../utils/copy"

const UsersAll = () => {
    const [count, setCount] = useState("0")
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [name, setName] = useState("")
    const [orderBy, setOrderBy] = useState("created_at DESC")
    const [users, setUsers] = useState([])

    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [loading, setLoading] = useState(true)

    const getCount = async () => {
        try {
            const {data} = await axios.get(`users/count`)
            setCount(data.Count)
        } catch (e) {
            setErrMsg(`에러 발생 ${e}`)
        }
        setLoading(false)
    }

    const submit = e => {
        e.preventDefault()

        setUsers([])

        if (name !== "") {
            searchName()
        } else {
            getResults()
        }
    }

    const getResults = async () => {
        setLoading(true)
        try {
            const {data} = await axios.get(`users/search/order-by/${orderBy}`, {params: {limit: limit, page: page}})
            setUsers(data)
        } catch (e) {
            setErrMsg(`문제 발생 ${e}`)
        }
        setLoading(false)
    }

    const searchName = async () => {
        setLoading(true)
        try {
            const {data} = await axios.get(`users/search/by-name/${name}/order-by/${orderBy}`, {
                params: {
                    limit: limit,
                    page: page
                }
            })
            if (!data) {
                setErrMsg("데이터 없음")
                return
            }
            setUsers(data)
        } catch (e) {
            setErrMsg(`문제 발생 ${e}`)
        }
        setLoading(false)
    }

    const getToken = async (id) => {
        setOkMsg("")

        if (!window.confirm("암호 재설정 토큰을 생성해 클립보드에 복사합니다.")) {
            return
        }
        setLoading(true)
        try {
            const {data} = await axios.get(`users/${id}/pw-change`)
            let link = `https://zego.life/help/pw-change/${data.ID}`
            copy(link)
            setOkMsg("복사되었습니다. " + link)
        } catch (e) {
            setErrMsg(`문제 발생 ${e}`)
        }
        setLoading(false)
    }

    useEffect(() => {
        getCount()
    }, [])

    if (count === "0") {
        return (
            <>
                <h1 className="page-title">사용자 일람</h1>
            </>
        )
    }

    return (
        <>
            {loading ? <div className="loader"/> : null}
            <h1 className="page-title"><Back content="사용자 일람"/></h1>
            <ErrorBox content={errMsg}/>
            <article className="card-box shadow-3">
                <h2>총 {count}명</h2>
            </article>
            <form className="form" onSubmit={submit}>
                <div className="flex flex-column">
                    <label className="my-2">표시할 수</label>
                    <input type="numberic" pattern="[0-9]*" value={limit} onChange={e => setLimit(e.target.value)}
                           required className="input" placeholder="10"/>
                </div>
                <div className="flex flex-column">
                    <label className="my-2">페이지</label>
                    <input type="numberic" pattern="[0-9]*" value={page} onChange={e => setPage(e.target.value)}
                           required className="input" placeholder="1"/>
                </div>
                <div className="flex flex-column">
                    <label className="my-2">이름 검색</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                           className="input" placeholder="필요 시 입력"/>
                </div>
                <div className="flex flex-column">
                    <label className="my-2">정렬 기준</label>
                    <select className="select full" value={orderBy} onChange={e => setOrderBy(e.target.value)}>
                        <option value="created_at ASC">가입 일자 (오래된 순)</option>
                        <option value="created_at DESC">가입 일자 (최신 순)</option>
                        <option value="name ASC">이름 (순행)</option>
                        <option value="name DESC">이름 (역행)</option>
                    </select>
                </div>
                <InfoBox content="더 정밀한 조건 검색이 필요하면 개발자에게 문의하세요."/>
                <button type="submit" className="button" onClick={getResults}>가져오자!</button>
            </form>
            <h2 className="my-5">결과</h2>
            <SuccessBox content={okMsg}/>
            {users.map(u => {
                return (
                    <UserBox u={u} key={u.Email}>
                        <button className="button float-right" onClick={() => getToken(u.ID)}>암호 재설정 링크</button>
                    </UserBox>
                )
            })}
        </>
    )
}

export default UsersAll