import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'

import Page, {Title} from '../../components/Page'
import {InfoBox} from '../../components/AlertBox'

const meGrade = localStorage.getItem("me.grade")
const meClass = localStorage.getItem("me.class")

const types = [
    `${meGrade}-${meClass}`,
]

const Timetable = ({history}) => {
    const [type, setType] = useState(0) // 0: class 1: exam

    const getNext = (t) => types.length - 1 === t ? 0 : t + 1

    const setNext = () => {
        setType(getNext(type))
    }

    return (
        <Page title={`${types[type]} 시간표`} hideTitle>
            <Title onClick={setNext}>{types[type]} 시간표 {getNext(type) !== type ?
                <span className="sub">{types[getNext(type)]}</span> : null}</Title>
            <InfoBox>정식 시간표가 나오기를 기다리며...</InfoBox>
            {/*type == 0 ? <TimetableClass history={history} meGrade={meGrade} meClass={meClass} /> : null*/}
        </Page>
    )
}

export default withRouter(Timetable)