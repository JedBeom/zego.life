import React from 'react'

let start = new Date(2020, 9, 30) // 새사, 진기쌤

const DormInspector = ({date, correction}) => {
    let correctionValue = false
    if (date.getHours() < 12) correction = true
    date.setHours(0, 0, 0, 0)
    let diff = ((start - date) / 1000 / 60 / 60 / 24) % 2
    if (correctionValue && correction) diff = !diff
    return (
        <article className="card-box shadow-3">
            <h2 className="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler" viewBox="0 0 24 24">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 12l5 5l10 -10"/>
                    <path d="M2 12l5 5m5 -5l5 -5"/>
                </svg>
                오늘의 사감
            </h2>
            <div className="float-right">
                {localStorage.getItem("me.sex") === "1" ?
                    <p>{!diff ? "정진기" : "이만수"} 사감</p>
                    :
                    <p>{!diff ? "이순덕(새사)" : "장정숙(장사)"} 사감</p>
                }
            </div>
        </article>
    )
}

export default DormInspector