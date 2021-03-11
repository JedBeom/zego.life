import React, {useEffect, useState} from 'react'
import {getTimetable, getTimetableTemplate} from '../../common/api'

import TimetableTd from '../../components/TimetableTd'

const times = [
    {s: "8:40", e: "9:30"},
    {s: "9:40", e: "10:30"},
    {s: "10:40", e: "11:30"},
    {s: "11:40", e: "12:30"},
    {s: "13:40", e: "14:30"},
    {s: "14:40", e: "15:30"},
    {s: "15:40", e: "16:30"},
    {s: "16:50", e: "18:00"},
]

const TimetableClass = ({meGrade, meClass, history}) => {
    const [lessons, setLessons] = useState([[]])
    const [credits, setCredits] = useState({})
    const twd = new Date().getDay()

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        if (meClass === null) {
            return
        }
        try {
            const cs = await getTimetable(history)
            if (cs) {
                setCredits(cs)
            }

            const ls = await getTimetableTemplate(meGrade, meClass)
            if (ls) {
                setLessons(ls)
            }

        } catch (e) {
            console.log(`시간표 가져오기를 실패했습니다. ${e}`)
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
                                    <span className="start-end">始{times[li].s}</span>
                                    <span className="start-end">終{times[li].e}</span>
                                </td>
                                {[0, 1, 2, 3, 4].map(wd => { // week day

                                    if (lessons[wd][li] && lessons[wd][li].Subject in credits) {
                                        return <TimetableTd key={`${wd}${li}`} today={twd === wd + 1}
                                                            lesson={credits[lessons[wd][li].Subject]}/>
                                    }

                                    return <TimetableTd key={`${wd}${li}`} today={twd === wd + 1}
                                                        lesson={lessons[wd][li]}/>
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

export default TimetableClass