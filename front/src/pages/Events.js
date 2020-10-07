import React, {useEffect, useState} from 'react'
import {getEvents} from '../common/api'
import LoadingCard from '../components/LoadingCard'

const Events = () => {

    const [errMsg, setErrMsg] = useState("")
    const [events, setEvents] = useState(undefined)

    useEffect(() => {
        document.title = "일정 | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
        const fetchData = async () => {
            try {
                const data = await getEvents()
                setEvents(data)
            } catch (e) {
                setErrMsg("일정 불러오기를 실패했습니다. 새로고침 해보시겠어요?")
                alert(e)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <h1 className="page-title">일정</h1>
            {errMsg !== "" ?
                <div className={"mb-5 bg-red-lightest red px-5 py-3 br-3 border-l bw-6 bc-red"}>
                    {errMsg}
                </div> : null}
            {events !== undefined ?

                <article className="card-box shadow-3">
                    <h2 className="card-title">{events[events.keys[0]][0].date.getFullYear()}년 {events[events.keys[0]][0].date.getMonth() + 1}월</h2>
                    <div className="table-container">
                        <table className="events">
                            <tbody>
                            {
                                events.keys.map((k, index) => (
                                    <>
                                        {
                                            events[k].map((e, j) => (
                                                <tr key={index + "-" + j}>
                                                    {j === 0 ?
                                                        <td className="event-date"
                                                            rowSpan={events[k].length}>{events[k][0].date.getDate()}일</td>
                                                        : null}
                                                    <td>{e.Name}{e.badges}</td>
                                                </tr>
                                            ))
                                        }
                                    </>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <p>일정은 정확하지 않을 수도 있어요.</p>
                </article>

                : <LoadingCard/>}
        </>
    )
}

export default Events