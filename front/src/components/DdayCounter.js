import React from 'react'
import {NavLink} from 'react-router-dom'

import CalendarIcon from '../icons/Calendar'

let targetDay = new Date(2021, 0, 8)

const DdayCounter = () => {
    let today = new Date()
    today.setHours(0, 0, 0, 0)
    let diff = targetDay - today
    let day = -(diff / 1000 / 60 / 60 / 24)
    return (
        <article className="card-box shadow-3">
            <h2 className="card-title">
                <CalendarIcon className="icon"/>
                <span className="diet-when">얼마나</span>남았나?</h2>
            <div className="flex justify-around dday-item">
                {day <= 0 ?
                    <div className="dday-item">
                        <p className="dday-name mt-3">방학식</p>
                        {day === 0 ?
                            <p className="dday-dday">D-DAY</p>
                            :
                            <p className="dday-dday">D{day}</p>
                        }
                    </div>
                    : null
                }
            </div>
            <NavLink to="/events">
                <p className="text-center">
                    <svg className="icon icon-tabler" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <rect x="4" y="5" width="16" height="16" rx="2"/>
                        <line x1="16" y1="3" x2="16" y2="7"/>
                        <line x1="8" y1="3" x2="8" y2="7"/>
                        <line x1="4" y1="11" x2="20" y2="11"/>
                        <line x1="11" y1="15" x2="12" y2="15"/>
                        <line x1="12" y1="15" x2="12" y2="18"/>
                    </svg>
                    다른 일정 확인하기
                </p>
            </NavLink>
        </article>
    )
}

export default DdayCounter