import React, {useState} from "react";
import axios from 'axios'

const TokenExpired = () => {
    const [loading, setLoading] = useState(false)

    const logout = async () => {
        setLoading(true)
        try {
            await axios.get("logout")
        } catch (e) {
            alert("로그아웃 실패! 그러나 로그인 전 상태로 돌아갑니다.")
        }
        localStorage.clear()
        window.location = "/login"
    }
    return (
        <>
            <h1 className="page-title">로그인 만료</h1>
            <p>로그인 정보가 만료되었어요. 다시 로그인이 필요해요.</p>
            <style>nav {'{opacity: 0}'}</style>
            <button className={loading ? "button float-right loading" : "button float-right"} onClick={logout}>로그아웃
            </button>
        </>
    )
}

export default TokenExpired