import React, {useEffect, useState} from 'react'
import {SuccessBox, WarningBox} from '../../components/AlertBox'

import axios from 'axios'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";
import Page from '../../components/Page'

const DDayList = () => {
    const [errMsg, setErrMsg] = useState("")
    const [okMsg, setOkMsg] = useState("")
    const [events, setEvents] = useState([])

    const [name, setName] = useState()
    const [date, setDate] = useState(null)
    const [target, setTarget] = useState("-1")

    useEffect(() => {
        getDDays()
    }, [])

    const getDDays = async () => {
        try {
            const {data} = await axios.get(`dday-events`)
            if (data) setEvents(data)
        } catch (e) {
            setErrMsg(`${e}`)
        }
    }

    const submit = async e => {
        e.preventDefault()

        if (!name) {
            setErrMsg("이름 써라")
            return
        }

        if (!date) {
            setErrMsg("날짜 써라")
            return
        }

        date.setHours(0, 0, 0, 0)

        let p = {
            Name: name,
            Date: date,
            Target: parseInt(target),
        }

        try {
            await axios.post(`dday-events`, p)
            setOkMsg("만들었어!")
            setName("")
            setDate(null)
            setTarget("-1")
        } catch (e) {
            setErrMsg(`${e}`)
        }
    }

    return <Page title="디데이 목록" back>
        <WarningBox>{errMsg}</WarningBox>
        <SuccessBox>{okMsg}</SuccessBox>
        <form className="form mb-6" onSubmit={submit}>
            <div className="flex flex-column">
                <label className="my-2">이름</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                       className="input" placeholder="졸업식"/>
            </div>
            <div className="flex flex-column">
                <label className="my-2">날짜</label>
                <DatePicker className="input register-birthday" disabledKeyboardNavigation
                            placeholderText="ex) 2004-09-08"
                            dateFormat="yyyy-MM-dd" openToDate={new Date(2021, 8, 8)}
                            onChange={(d) => setDate(d)}
                            selected={date} todayButton="오늘"/>
            </div>
            <div className="flex flex-column">
                <label className="my-2">대상</label>
                <select className="select full" value={target} onChange={e => setTarget(e.target.value)}>
                    <option value="-1">모두</option>
                    <option value="1">고1</option>
                    <option value="2">고2</option>
                    <option value="3">고3</option>
                </select>
            </div>
            <button type="submit" className="button" onClick={submit}>만들자!</button>
        </form>
        {events.map(e => (
            <article onClick={() => {
            }} key={e.ID} className="card-box shadow-3">
                <ul>
                    <li>이름: {e.Name}</li>
                    <li>대상: {e.Target}</li>
                    <li>날짜: {e.Date}</li>
                </ul>
            </article>
        ))}
    </Page>
}

export default DDayList