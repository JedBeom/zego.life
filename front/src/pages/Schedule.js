import React, {Fragment, useEffect, useState} from 'react'
import {getSchedule} from '../common/api'
import LoadingCard from '../components/LoadingCard'

const Schedule = () => {

    const [errMsg, setErrMsg] = useState("")
    const [sches, SetSches] = useState([])

    useEffect(() => {
        document.title = "일정 | 제고라이프"
        const fetchData = async () => {
            try {
                const data = await getSchedule()
                SetSches(data)
            } catch {
                setErrMsg("일정 불러오기를 실패했습니다. 새로고침 해보시겠어요?")
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
            {sches.length > 0 ?

                <article className="card-box shadow-3">
                    <h2 className="card-title">{sches[0].DateString.slice(0, 4)}년 {sches[0].DateString.slice(4, 6)}월</h2>
                    <ul>
                        {sches.map((sche) => {
                            return (
                                <li>{sche.DateString.slice(4, 6)}-{sche.DateString.slice(6, 8)} {sche.Name}</li>
                            )
                        })}
                    </ul>
                </article>

                : <LoadingCard/>}
        </Fragment>
    )
}

export default Schedule