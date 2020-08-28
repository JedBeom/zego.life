import React from 'react'
import axios from 'axios'

const Me = () => {
    if (localStorage.getItem("token") === null) {
        window.location = "/login"
        return
    }

    const onClick = async () => {
        try {
            await axios.get("logout")
        } catch (e) {
            alert("로그아웃 실패! 그러나 로그인 전 상태로 돌아갑니다.")
        }
        localStorage.removeItem("me.name")
        localStorage.removeItem("me.id")
        localStorage.removeItem("token")
        window.location = "/login"
    }

    return (
        <button className="button" onClick={onClick}>로그아웃</button>
    )
}

export default Me