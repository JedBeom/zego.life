import React, {useState} from 'react'
import SelectorIcon from '../../icons/Selector'

const times = [
    {s: "9:00", e: "9:45"},
    {s: "9:55", e: "10:40"},
    {s: "11:00", e: "11:45"},
    {s: "11:55", e: "12:40"},

    {s: "13:35", e: "14:20"},
    {s: "14:30", e: "15:15"},
    {s: "15:40", e: "16:25"},
    {s: "16:35", e: "17:20"},
]

const key = "2021WINTER-Lesson"

const TimetableExtra = () => {
    const [lessonA, setLessonA] = useState(() => {
        let item = localStorage.getItem(key+"A")
        if (item === null) item = "A강좌"
        return item
    })

    const [lessonB, setLessonB] = useState(() => {
        let item = localStorage.getItem(key+"B")
        if (item === null) item = "B강좌"
        return item
    })

    let lessons = [
        lessonA,
        lessonA,
        lessonB,
        lessonB,
        "오후자습 1",
        "오후자습 2",
        "야간자습 1",
        "야간자습 2",
    ]

    const saveLessons = () => {
        localStorage.setItem(key+"A", lessonA)
        localStorage.setItem(key + "B", lessonB)
        alert("저장했어요!")
    }

    return (
        <>
        <div className="table-container timetable-container">
            <table className="timetable">
                <tbody>
                {
                    [0, 1, 2, 3, 4, 5, 6, 7].map(li => { // lessons index 
                        return <tr key={li}>
                            <td>
                                { li <= 3 ? 
                                <span className="subject">{li + 1}교시</span>
                                : <span className="subject">자습</span>}
                                <span className="start-end">始{times[li].s}</span>
                                <span className="start-end">終{times[li].e}</span>
                            </td>
                            <td className="today">
                                <span className="subject">{lessons[li]}</span>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
        <article className="mt-4 card-box shadow-3">
            <h2>선택과목 입력 <SelectorIcon/></h2>
            <div className="flex flex-column mt-3">
                <label className="my-2">A강좌</label>
                <input type="text" value={lessonA} onChange={e => setLessonA(e.target.value)}
                        className="input" placeholder="물리학2/물리실"/>
            </div>
            <div className="flex flex-column mt-3">
                <label className="my-2">B강좌</label>
                <input type="text" value={lessonB} onChange={e => setLessonB(e.target.value)}
                        className="input" placeholder="생윤/106"/>
            </div>
            <button className="mt-3 button float-right" onClick={saveLessons}>저장!</button>
            <p className="mt-6">기기에 저장됩니다.</p>
        </article>
        </>
    )
}

export default TimetableExtra