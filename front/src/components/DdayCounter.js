import React from 'react'

let targetDay = new Date()
targetDay.setFullYear(2020)
targetDay.setMonth(9)
targetDay.setDate(26)

const DdayCounter = () => {
    let diff = Math.abs(targetDay - new Date())
    let day = -Math.floor(diff / 1000 / 60 / 60 / 24 + 1)
    return (
        <article className="card-box shadow-3">
            <h2 className="card-title">📅 <span className="diet-when">얼마나</span>남았나?</h2>
            <p className="dday-name mt-3">중간고사</p>
            <p className="dday-dday">끗!</p>
        </article>
    )
}

export default DdayCounter