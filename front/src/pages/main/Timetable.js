import { useState } from 'react';
import {withRouter} from 'react-router-dom'

import TimetableClass from './TimetableClass'

import Page, {Title} from '../../components/Page'

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
        <Page title={`내 시간표`} hideTitle>
            <Title onClick={setNext}>내 시간표 {getNext(type) !== type ?
                <span className="sub">{types[getNext(type)]}</span> : null}</Title>
            {type === 0 ? <TimetableClass history={history} meGrade={meGrade} meClass={meClass}/> : null}
            <footer className="copyright">Speical Thanks to 박현정, 정민기, 박지수 of OnAir</footer>
        </Page>
    )
}

export default withRouter(Timetable)