import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Page from '../../components/Page'
import {ErrorBox} from '../../components/AlertBox'

const alpha = [{a: "A", k: "cs01"}, {a: "B", k: "cs02"}, {a: "C", k: "cs03"}, {a: "D", k: "cs04"}]

const TimetableSetCredit = () => {
    let answers = {}

    const [list, setList] = useState()
    const [errMsg, setErrMsg] = useState()

    const getList = async () => {
        try {
            const {data} = await axios.get(`timetables/subjects`)
            setList(data)
        } catch (e) {
            setErrMsg(`${e}`)
        }

    }

    const submit = async e => {
        e.preventDefault()
        for (let i = 1; i <= 4; i++) {
            console.log(JSON.parse(answers[`cs0${i}`].value))
        }
    }

    useEffect(() => {
        getList()
    }, [])

    if (!list) return <div className="loader"/>

    return <Page title="선택과목 설정">
        <p>시간표를 보기 위해서는, 내 선택과목을 입력해야합니다. </p>
        <ErrorBox>{errMsg}</ErrorBox>
        <form onSubmit={submit}>
            <div className="flex flex-column">
                <label>음악 또는 미술</label>
                <select className="select">
                    {list.Art.map(e => <option>{e.Teacher} - {e.Subject}</option>)}
                </select>
            </div>
            <div className="flex flex-column">
                <label>외국어</label>
                <select className="select">
                    {list.Foreign.map(e => <option>{e.Teacher} - {e.Subject}</option>)}
                </select>
            </div>
            {alpha.map((e) => {

                return <div className="flex flex-column">
                    <label>선{e.a}</label>
                    <select className="select" ref={node => answers[e.k] = node}>
                        <option value="">선택</option>
                        {list.Credit.map(s => <option value={JSON.stringify(s)}>{s.Teacher} - {s.Subject}</option>)}
                    </select>
                </div>
            })}
            <button className="button" type="submit">HIHI</button>
        </form>
    </Page>
}

export default TimetableSetCredit