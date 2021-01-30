import React from 'react'
import {NavLink} from 'react-router-dom'

let targetDay = new Date(2021, 1, 3)

const Main = () => {
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let diff = targetDay - today
    let day = -(diff / 1000 / 60 / 60 / 24)

    return (
        <>
            <h1 className="page-title">한빛제
                {day === 0 ? " D-DAY" : ` D${day}`}
            </h1>
            <article className="card-box shadow-3 goto">
                {day + 1 >= 0 ?
                    <NavLink to="/fes/site">온라인 한빛제 바로가기</NavLink>
                    : <p>2월 2일에 사이트가 공개됩니다</p>}
            </article>
        </>
    )
}

export default Main