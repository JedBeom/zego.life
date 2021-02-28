import React, {useEffect, useState} from 'react'
import UserBox from '../../components/UserBox'
import axios from 'axios'
import {ErrorBox, InfoBox, SuccessBox} from '../../components/AlertBox'
import Page from "../../components/Page"
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

    const submit = async e => {
        console.log({name})

        setOkMsg("")
        setErrMsg("")
        e.preventDefault()

        setUsers([])

        setLoading(true)

        try {
            if (name) {
                await searchName()
            } else {
                await getResults()
            }
        } catch (e) {
            setErrMsg(`문제 발생! ${e}`)
        }
        setLoading(false)
    }

    const getResults = async () => {
        const {data} = await axios.get(`users/search/order-by/${orderBy}`, {params: {limit: limit, page: page}})
        setUsers(data)
    }

    const searchName = async () => {
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
    }

    const getToken = async (id) => {
        setOkMsg("")
        setErrMsg("")

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

    const updateRoles = async (id, roles) => {
        setOkMsg("")
        setErrMsg("")

        if (roles.includes("admin")) {
            setErrMsg("어드민의 역할은 수정할 수 없습니다!")
            return
        }

        roles = window.prompt("역할을 수정합니다. 쉼표로 구분합니다. 마지막에도 쉼표를 붙여주세요.", roles)
        if (roles === null) {
            return
        }

        if (roles.includes("admin")) {
            setErrMsg("어드민은 추가할 수 없습니다!")
            return
        }

        setLoading(true)
        try {
            await axios.patch(`users/${id}/roles`, {"Roles": roles})
            setOkMsg("역할을 수정했습니다.")
            getResults()
        } catch (e) {
            setErrMsg(`문제 발생 ${e}`)
        }
        setLoading(false)
    }

    useEffect(() => {
        getCount()
    }, [])

    return <Page loading={count === "0"} title="사용자 목록" back>
        {loading ? <div className="loader"/> : null}
        <ErrorBox>{errMsg}</ErrorBox>
        <article className="card-box">
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
            <InfoBox>더 정밀한 조건 검색이 필요하면 개발자에게 문의하세요.</InfoBox>
            <button type="submit" className="button">가져오자!</button>
        </form>
        <h2 className="my-5">결과</h2>
        <SuccessBox>{okMsg}</SuccessBox>
        {users.map(u => {
            return (
                <UserBox u={u} key={u.Email}>
                    <button className="button float-right" onClick={() => getToken(u.ID)}>암호 재설정 링크</button>
                    <button className="button float-right" onClick={() => updateRoles(u.ID, u.Roles)}>역할 수정</button>
                </UserBox>
            )
        })}
    </Page>
}

export default UsersAll