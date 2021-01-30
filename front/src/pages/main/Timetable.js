import React, {useEffect, useState} from 'react'
import TimetableClass from './TimetableClass'

const meGrade = localStorage.getItem("me.grade")
const meClass = localStorage.getItem("me.class")

const types = [
    `${meGrade}-${meClass}`,
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

    if (meClass === null) {
        return (
            <>
                <h1 className="page-title">시간표</h1>
                <p>반 정보가 없습니다. 다시 로그인해주세요.</p>
            </>
        )
    }

    return (
        <>
            <h1 className="page-title" onClick={setNext}>{types[type]} 시간표 {getNext(type) !== type ?
                <span className="sub">{types[getNext(type)]}</span> : null}</h1>
            {type === 0 ? <TimetableClass meGrade={meGrade} meClass={meClass}/> : null}
        </>
    )
}

export default Timetable