import React, {useEffect, useState} from 'react'
import {getTimetable} from '../common/api'

let meGrade = localStorage.getItem("me.grade")
let meClass = localStorage.getItem("me.class")

const Timetable = () => {
    const [lessons, setLessons] = useState([[]])
    const [twd, setTwd] = useState(0)

    useEffect(() => {
        get()
    }, [])

    const get = async () => {
        setTwd(new Date().getDay())

        if (meClass === null) {
            return
        }
        try {
            const ls = await getTimetable(meGrade, meClass)
            if (ls) {
                console.log(ls)
                setLessons(ls)
            }
        } catch (e) {
            alert(e)
        }
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
            <h1 className="page-title">{meGrade}-{meClass} 시간표
                <div className="inline-block bg-green green-lightest px-2 fs-s2 br-round m-3">BETA</div>
            </h1>
            <div className="table-container">
                {lessons.length !== 1 ?
                    <table className="timetable">
                        <thead>
                        <tr>
                            {["", "월", "화", "수", "목", "금"].map((v, i) => {
                                if (i === twd) {
                                    return <td className="today">{v}</td>
                                }
                                return <td>{v}</td>
                            })}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            [0, 1, 2, 3, 4, 5, 6].map(li => { // lessons index 
                                return <tr key={li}>
                                    <td>{li + 1}교시</td>
                                    {[0, 1, 2, 3, 4].map(wd => { // week day
                                        if (wd + 1 === twd) { // if today
                                            if (lessons[wd][li] === undefined) {
                                                return <td className="today" key={`${li}${wd}`}/>
                                            } else if (lessons[wd][li].Teacher === "") {
                                                return <td className="today" key={`${li}${wd}`}><span
                                                    className="subject">{lessons[wd][li].Subject}</span><br/><span
                                                    className="teacher">담당</span></td>
                                            }
                                            return <td className="today"
                                                       key={`${li}${wd}`}><span
                                                className="subject">{lessons[wd][li].Subject}</span><br/><span
                                                className="teacher">{lessons[wd][li].Teacher}T</span>
                                            </td>
                                        }
                                        if (lessons[wd][li] === undefined) {
                                            return <td key={`${li}${wd}`}/>
                                        } else if (lessons[wd][li].Teacher === "") {
                                            return <td key={`${li}${wd}`}><span
                                                className="subject">{lessons[wd][li].Subject}</span><br/><span
                                                className="teacher">담당</span></td>
                                        }
                                        return <td
                                            key={`${li}${wd}`}><span
                                            className="subject">{lessons[wd][li].Subject}</span><br/><span
                                            className="teacher">{lessons[wd][li].Teacher}T</span>
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