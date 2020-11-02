import React from 'react'

let start = new Date(2020, 9, 30) // 새사, 진기쌤

const DormInspector = () => {
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let diff = ((start - today) / 1000 / 60 / 60 / 24) % 2
    return (
        <article className="card-box shadow-3">
            <h2 className="card-title">오늘의 사감
            </h2>
            <div className="flex justify-between">
                <div className="diet-apply px-2 br-round blue-lightest bg-blue-dark">
                    남: {!diff ? "진기" : "만수"} 쌤
                </div>
                <div className="diet-apply px-2 br-round red-lightest bg-red-dark">
                    여: {!diff ? "새사" : "정사"} 쌤
                </div>
            </div>
        </article>
    )
}

export default DormInspector