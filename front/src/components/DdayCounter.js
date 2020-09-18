import React from 'react'

let targetDay = new Date()
targetDay.setFullYear(2020)
targetDay.setMonth(9)
targetDay.setDate(26)
let diff = Math.abs(targetDay - new Date())
let day = -Math.floor(diff / 1000 / 60 / 60 / 24)

const DdayCounter = () => {
    return (
        <article className="card-box shadow-3">
            <h2 className="card-title font-s-core">📅 <span className="diet-when">얼마나</span>남았나?</h2>
            <p className="dday-name mt-3">기말고사 시작까지</p>
            <p className="dday-dday">D{day}</p>
        </article>
    )
}

export default DdayCounter