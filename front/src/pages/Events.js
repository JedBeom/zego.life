import React, {Fragment, useEffect, useState} from 'react'
import {getEvents} from '../common/api'

const weekdays = ['일', '월', '화', '수', '목', '금', '토']

const Events = () => {

    const [errMsg, setErrMsg] = useState("")
    const [events, setEvents] = useState(undefined)
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth() + 1)
    const [loading, setLoading] = useState(true)

    const next = () => {
        if (month >= 12) {
            setYear(bY => bY + 1)
            setMonth(1)
        } else {
            setMonth(bM => bM + 1)
        }
    }

    const previous = () => {
        if (month <= 1) {
            setYear(bY => bY - 1)
            setMonth(12)
        } else {
            setMonth(bM => bM - 1)
        }
    }

    useEffect(() => {
        document.title = "일정 | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});

        const fetchData = async () => {
            setErrMsg("")
            setLoading(true)
            try {
                const data = await getEvents(year, month)
                setEvents(data)
            } catch (e) {
                setEvents(null)
                console.log(e)
                if (!e.response) {
                    setErrMsg("일정 불러오기를 실패했습니다. 새로고침 해보시겠어요?")
                } else {
                    setErrMsg("일정이 없습니다. 아직 서버에 등록이 안 되었을 수도 있어요!")
                }
            }
            setLoading(false)
        }
        fetchData()
    }, [year, month])

    return (
        <>
            <h1 className="page-title flex justify-between"><span>{year}년 {month}월</span>
                <span><span className="mr-2" onClick={previous}> </span> <span onClick={next}></span></span>
            </h1>
            {loading ? <div className="loader"/> : null}
            {errMsg !== "" ?
                <div className={"mb-5 bg-red-lightest red px-5 py-3 br-3 border-l bw-6 bc-red"}>
                    {errMsg}
                </div> : null}
            {events === null ? <p>일정 없음</p> : null}
            {events !== undefined && events !== null ?

                <article className="card-box shadow-3">
                    <div className="table-container">
                        <table className="events">
                            <tbody>
                            {
                                events.keys.map((k, index) => (
                                    <Fragment key={k + "-" + index}>
                                        {
                                            events[k].map((e, j) => (
                                                <tr key={index + "-" + j}>
                                                    {j === 0 ?
                                                        <td className="event-date"
                                                            rowSpan={events[k].length}>{events[k][0].date.getDate()}일 {weekdays[events[k][0].date.getDay()]}</td>
                                                        : null}
                                                    <td>{e.Name}{e.badges}</td>
                                                </tr>
                                            ))
                                        }
                                    </Fragment>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <p>일정은 정확하지 않을 수도 있어요.</p>
                </article>

                : null}
        </>
    )
}

export default Events