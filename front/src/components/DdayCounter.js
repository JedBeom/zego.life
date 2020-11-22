import React from 'react'
import {NavLink} from 'react-router-dom'

let targetDay = new Date(2020, 11, 21)

const DdayCounter = () => {
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let diff = targetDay - today
    let day = -(diff / 1000 / 60 / 60 / 24)
    return (
        <article className="card-box shadow-3">
            <h2 className="card-title">📅 <span className="diet-when">얼마나</span>남았나?</h2>
            <div className="flex justify-around dday-item">
                {day <= 0 ?
                    <div className="dday-item">
                        <p className="dday-name mt-3">기말고사</p>
                        {day === 0 ?
                            <p className="dday-dday">D-DAY</p>
                            :
                            <p className="dday-dday">D{day}</p>
                        }
                    </div>
                    : null
                }
            </div>
            <NavLink to="/events"><p className="text-center">다른 일정 확인하기</p></NavLink>
        </article>
    )
}

export default DdayCounter