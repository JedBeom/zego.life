import React, {Fragment, useEffect, useState} from 'react'
import {getEvents} from '../common/api'
import LoadingCard from '../components/LoadingCard'

const Schedule = () => {

    const [errMsg, setErrMsg] = useState("")
    const [events, setEvents] = useState([])

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
        <Fragment>
            <h1 className="page-title">일정</h1>
            {errMsg !== "" ?
                <div className={"mb-5 bg-red-lightest red px-5 py-3 br-3 border-l bw-6 bc-red"}>
                    {errMsg}
                </div> : null}
            {events.length > 0 ?

                <article className="card-box shadow-3">
                    <h2 className="card-title">{events[0].date.getFullYear()}년 {events[0].date.getMonth() + 1}월</h2>
                    <div className="table-container table-striped">
                        <table className="events">
                            {events.map((e) => {
                                return (
                                    <tr>
                                        <th>{e.date.getDate()}일</th>
                                        <th>{e.Name} {e.badges}</th>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                    <p>일정은 빠르게 갱신되지 않습니다.</p>
                </article>

                : <LoadingCard/>}
        </Fragment>
    )
}

export default Schedule