import React from 'react'

let targetDay = new Date(2020, 10, 18)

const DdayCounter = () => {
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let diff = Math.abs(targetDay - today)
    let day = -(diff / 1000 / 60 / 60 / 24)
    return (
        <article className="card-box shadow-3">
            <h2 className="card-title">📅 <span className="diet-when">얼마나</span>남았나?</h2>
            <p className="dday-name mt-3">1학년 학력평가</p>
            <p className="dday-dday">D{day - 1}</p>
            <p className="dday-name mt-3">2학년 학력평가</p>
            <p className="dday-dday">D{day}</p>
        </article>
    )
}

export default DdayCounter