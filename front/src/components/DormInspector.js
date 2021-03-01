import React from 'react'
import styled from 'styled-components'

let start = new Date(2020, 9, 30) // 새사, 만수쌤

const DormInspector = ({date, correction}) => {
    let correctionValue = false
    if (date.getHours() < 12) correctionValue = true
    date.setHours(0, 0, 0, 0)
    let diff = ((start - date) / 1000 / 60 / 60 / 24) % 2
    if (correctionValue && correction) diff = !diff
    return (
        <article className="card-box">
            <h2 className="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler" viewBox="0 0 24 24">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M7 12l5 5l10 -10"/>
                    <path d="M2 12l5 5m5 -5l5 -5"/>
                </svg>
                {correction ? "지금" : "이날"}의 사감
            </h2>
            <div className="float-right">
                <Inspector>
                    {localStorage.getItem("me.sex") === "1" ?
                        (!diff ? "이만수" : "정진기")
                        :
                        (!diff ? "이순덕(새사)" : "장정숙(장사)")
                    } 사감</Inspector>
            </div>
        </article>
    )
}

const Inspector = styled.p`
font-weight: 700;
`

export default DormInspector