import React from 'react'

let start = new Date(2020, 9, 30) // 새사, 진기쌤
let today = new Date()
today.setHours(0, 0, 0, 0)
let diff = ((start - today) / 1000 / 60 / 60 / 24) % 2

const DormInspector = () => {
    return (
        <article className="card-box shadow-3">
            <h2 className="card-title">오늘의 사감</h2>
            {!diff ? "정진기, 새사" : "이만수, 정사"}
        </article>
    )
}

export default DormInspector