import React, {useState} from 'react'
import TimetableClass from './TimetableClass'
import TimetableExam from './TimetableExam'

const meGrade = localStorage.getItem("me.grade")
const meClass = localStorage.getItem("me.class")

const types = [`${meGrade}-${meClass} 시간표`, `${meGrade}학년 시험 시간표`]

const Timetable = () => {
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
            <h1 className="page-title" onClick={setNext}>{types[type]} <span>{types[getNext(type)]}</span></h1>
            {type === 0 ? <TimetableClass meGrade={meGrade} meClass={meClass}/> : null}
            {type === 1 ? <TimetableExam meGrade={meGrade}/> : null}
        </>
    )
}

export default Timetable