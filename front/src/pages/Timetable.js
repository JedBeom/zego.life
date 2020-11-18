import React, {useEffect, useState} from 'react'
import {getTimetable} from '../common/api'

let meGrade = localStorage.getItem("me.grade")
let meClass = localStorage.getItem("me.class")

const Timetable = () => {
    const [lessons, setLessons] = useState([[]])

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
                <div class="inline-block bg-green green-lightest px-2 fs-s2 br-round m-3">BETA</div>
            </h1>
            <div className="table-container">
                {lessons.length !== 1 ?
                    <table className="timetable">
                        <thead>
                        <tr>
                            <td></td>
                            <td>월</td>
                            <td>화</td>
                            <td>수</td>
                            <td>목</td>
                            <td>금</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            [0, 1, 2, 3, 4, 5, 6].map(li => { // weekday
                                return <tr key={li}>
                                    <td>{li + 1}교시</td>
                                    {[0, 1, 2, 3, 4].map(wd => { // lessons index
                                        if (lessons[wd][li] === undefined) {
                                            return <td key={`${li}${wd}`}/>
                                        } else if (lessons[wd][li].Teacher === "") {
                                            return <td key={`${li}${wd}`}>{lessons[wd][li].Subject}</td>
                                        }
                                        return <td
                                            key={`${li}${wd}`}>{lessons[wd][li].Subject}<br/>{lessons[wd][li].Teacher}T
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