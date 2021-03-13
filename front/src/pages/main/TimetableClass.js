import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {getTimetable, getTimetableTemplate} from '../../common/api'

import TimetableTd from '../../components/TimetableTd'
import Loading from '../../components/ui/Loading'

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
    const [loading, setLoading] = useState(true)
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
        } finally {
            setLoading(false)
        }

    }

    return (
        <Container>
            <Loading visible={loading}/>
            {lessons.length !== 1 ?
                <Table>
                    <Thead>
                    <tr>
                        {["", "월", "화", "수", "목", "금"].map((v, i) =>
                            <td className={i === twd ? "today" : ""} key={i}>{v}</td>
                        )}
                    </tr>
                    </Thead>
                    <tbody>
                    {
                        [0, 1, 2, 3, 4, 5, 6].map(li => { // lessons index 
                            return <tr key={li}>
                                <Order>
                                    {li+1}교시
                                    <StartEnd>始{times[li].s}</StartEnd>
                                    <StartEnd>終{times[li].e}</StartEnd>
                                </Order>
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
                </Table>
                : null }
        </Container>
    )
}

const Container = styled.div`
width: 100%;
overflow-x: scroll;
`

const Table = styled.table`
width: 100%;
border: none !important;
font-size: 1rem;
border-spacing: 0.5rem;
border-collapse: separate !important;
border-radius: .4em;
`

const Thead = styled.thead`
td {
    text-align: center;
    min-width: 3.5rem;
}
`

const Order = styled.td`
font-size: .75em;
font-weight: 900;
opacity: 1;
`

const StartEnd = styled.p`
font-size: 1em;
display: block;
font-weight: 300;
word-break: keep-all;
`

export default TimetableClass