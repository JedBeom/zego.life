import React, {useState} from 'react'
import Back from "../../components/Back"
import axios from 'axios'

const PwChange = () => {
    const [searchName, setSearchName] = useState("")
    const [resultUsers, setResultUsers] = useState([])
    const [link, setLink] = useState("")

    const search = async e => {
        e.preventDefault()
        try {
            const {data} = await axios.get(`users/search/by-name/${searchName}`)
            if (!data) {
                alert("데이터 없음")
                return
            }
            setResultUsers(data)
        } catch (e) {
            alert(`문제 발생 ${e}`)
        }
    }

    const getToken = async (id) => {
        if (!window.confirm("token을 generate할까?")) {
            return
        }

        try {
            const {data} = await axios.get(`users/${id}/pw-change`)
            setLink(`https://zego.life/help/pw-change/${data.ID}`)
        } catch (e) {
            alert(`문제 발생 ${e}`)
        }
    }

    return (
        <>
            <h1 className="page-title"><Back content="암호 변경 토큰 생성"/></h1>
            <div className="flex flex-column">
                <label className="my-2">검색: 이름</label>
                <form className="mb-3" onSubmit={search}>
                    <input type="text" value={searchName} onChange={e => setSearchName(e.target.value)}
                           className="input"/>
                    <button className="button" type="submit">검색</button>
                </form>
                {resultUsers.map(e => {
                    return <article key={e.ID} className="card-box shadow-3 yellow-blue" onClick={() => getToken(e.ID)}>
                        <p>{e.Grade}학년 {e.Class}반 {e.Number}번 {e.Name}</p>
                    </article>
                })}
                <p>{link}</p>
            </div>
        </>
    )
}

export default PwChange