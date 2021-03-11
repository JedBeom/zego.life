import React from 'react'

export default function TimetableTd({today, lesson}) {
    if (!lesson) return <td></td>

    return <td className={today ? "today" : ""}> {lesson !== undefined ? <>
        <span className="subject">{lesson.Subject}</span>
        <span
            className="teacher">{lesson.Teacher ? lesson.Teacher : "담당"}</span>
    </> : null}
        {lesson.Room ? <span className="room">{lesson.Room}</span> : null}
    </td>
}