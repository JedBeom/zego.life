import React, {useEffect, useState} from 'react'
import {getTimetable} from '../../common/api'

const times = [
    {s: "8:45", e: "9:30"},
    {s: "9:40", e: "10:25"},
    {s: "10:35", e: "11:20"},
    {s: "12:40", e: "13:25"},
    {s: "13:35", e: "14:20"},
    {s: "14:30", e: "15:15"},
    {s: "15:40", e: "16:25"},
    {s: "16:35", e: "17:20"},
]

const Timetable = ({meGrade, meClass}) => {
    const [lessons, setLessons] = useState([[]])
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

    return (
        <div className="table-container timetable-container">
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
                                <td>
                                    <span className="subject">{li + 1}교시</span>
                                    <span className="teacher">始 {times[li].s}</span>
                                    <span className="teacher">終 {times[li].e}</span>
                                </td>
                                {[0, 1, 2, 3, 4].map(wd => { // week day
                                    return <td className={wd + 1 === twd ? "today" : ""}
                                               key={`${li}${wd}`}> {lessons[wd][li] !== undefined ? <>
                                        <span className="subject">{lessons[wd][li].Subject}</span>
                                        <span
                                            className="teacher">{lessons[wd][li].Teacher !== "" && lessons[wd][li].Teacher !== undefined ? lessons[wd][li].Teacher : "담당"}</span>
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
    )
}

export default Timetable