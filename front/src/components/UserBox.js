import React from 'react'

import CardBox from '../components/ui/CardBox'

import {timestampHangul} from "../utils/timestamp";

const sex = ["?", "남", "여"]
const residence = ["?", "기숙사", "비기숙사"]

const UserBox = ({u, children}) => {
    if (u === null) {
        return null
    }

    return (
        <CardBox>
            <h2>{u.Grade}-{u.Class} {u.Number} {u.Name}</h2>
            <ul>
                <li>성별: {sex[u.Sex]}</li>
                <li>이메일: {u.Email}</li>
                <li>거주: {residence[u.Residence]}</li>
                <li>생일: {u.BirthYear}년 {u.BirthMonth}월 {u.BirthDay}일</li>
                <li>가입: {timestampHangul(u.CreatedAt, true)}</li>
                <li>역할: {u.Roles}</li>
            </ul>
            {children}
        </CardBox>
    )
}

export default UserBox