import React, {Fragment, useEffect, useState} from 'react'

import Page, {Title} from '../../components/Page'
import {ErrorBox} from '../../components/AlertBox'
import {getEvents} from '../../common/api'

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

        const fetchData = async () => {
            setErrMsg("")
            setLoading(true)
            try {
                const data = await getEvents(year, month)
                setEvents(data)
            } catch (e) {
                setEvents(null)
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
        <Page title={`${year}년 ${month}월`} hideTitle={true}>
            <Title className="flex justify-between"><span>
            <svg className="icon icon-tabler" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <rect x="4" y="5" width="16" height="16" rx="2"/>
                <line x1="16" y1="3" x2="16" y2="7"/>
                <line x1="8" y1="3" x2="8" y2="7"/>
                <line x1="4" y1="11" x2="20" y2="11"/>
                <line x1="11" y1="15" x2="12" y2="15"/>
                <line x1="12" y1="15" x2="12" y2="18"/>
            </svg>
                {year}년 {month}월</span>
                <span><span className="mr-2" onClick={previous}> </span> <span onClick={next}></span></span>
            </Title>
            {loading ? <div className="loader"/> : null}
            <ErrorBox>{errMsg}</ErrorBox>
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
                    <p className="mt-4">일정은 정확하지 않을 수 있습니다.</p>
                </article>

                : null}
        </Page>
    )
}

export default Events