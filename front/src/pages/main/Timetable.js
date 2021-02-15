import React, {useEffect, useState} from 'react'

import Page from '../../components/Page'
import {InfoBox} from '../../components/AlertBox'

/*
const meGrade = localStorage.getItem("me.grade")
const meClass = localStorage.getItem("me.class")
*/

const types = [
//    `${meGrade}-${meClass}`,
]

const Timetable = () => {
    useEffect(() => {
        document.title = "시간표 | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [])

    const [type, setType] = useState(0) // 0: class 1: exam

    const getNext = (t) => types.length - 1 === t ? 0 : t + 1

    const setNext = () => {
        setType(getNext(type))
    }

    return (
        <Page>
            <h1 className="page-title" onClick={setNext}>{types[type]} 시간표 {getNext(type) !== type ?
                <span className="sub">{types[getNext(type)]}</span> : null}</h1>
            <InfoBox>새 시간표로 찾아뵙겠습니다.</InfoBox>
        </Page>
    )
}

export default Timetable