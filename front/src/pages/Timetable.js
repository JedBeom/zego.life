import React, {useEffect, useState} from 'react'
import {getTimetable} from '../common/api'
import useInterval from '../utils/useInterval'

let meGrade = localStorage.getItem("me.grade")
let meClass = localStorage.getItem("me.class")

const Timetable = () => {
    const [lessons, setLessons] = useState([[]])
    const [now, setNow] = useState(new Date())
    const twd = new Date().getDay()

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        if (meClass === null) {
            return
        }
        try {
            const ls = await getTimetable(meGrade, meClass)
            if (ls) {
                setLessons(ls)
            }
        } catch (e) {
            alert(e)
        }
    }

    useInterval(() => setNow(new Date()), 1000)

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
            <h1 className="page-title">{meGrade}-{meClass} 시간표
            </h1>
            {now.toTimeString()}
            <div className="table-container">
                {lessons.length !== 1 ?
                    <table className="timetable">
                        <thead>
                        <tr>
                            {["", "월", "화", "수", "목", "금"].map((v, i) =>
                                <td className={i === twd ? "today" : ""} key={i}>{v}</td>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            [0, 1, 2, 3, 4, 5, 6].map(li => { // lessons index 
                                return <tr key={li}>
                                    <td>{li + 1}교시<span className="teacher">10:00</span><span
                                        className="teacher">11:00</span></td>
                                    {[0, 1, 2, 3, 4].map(wd => { // week day
                                        return <td className={wd + 1 === twd ? "today" : ""}
                                                   key={`${li}${wd}`}> {lessons[wd][li] !== undefined ? <>
                                            <span className="subject">{lessons[wd][li].Subject}</span>
                                            <span
                                                className="teacher">{lessons[wd][li].Teacher !== "" && lessons[wd][li].Teacher !== undefined ? lessons[wd][li].Teacher + "T" : "담당"}</span>
                                        </> : null}
                                        </td>
                                    })}
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                    : <div className="loader"/>}
            </div>
        </>
    )
}

export default Timetable