import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Me = () => {
    useEffect(() => {
        document.title = "내 페이지 | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [])
    const [isLoading, setLoading] = useState(false)

    if (localStorage.getItem("token") === null) {
        window.location = "/login"
        return
    }

    const onClick = async () => {
        setLoading(true)
        try {
            await axios.get("logout")
        } catch (e) {
            alert("로그아웃 실패! 그러나 로그인 전 상태로 돌아갑니다.")
        }
        localStorage.removeItem("me.name")
        localStorage.removeItem("me.id")
        localStorage.removeItem("me.barcode")
        localStorage.removeItem("token")
        window.location = "/login"
    }

    let barcode = localStorage.getItem("me.barcode")

    return (
        <>
            <h1 className="page-title">내 페이지</h1>
            <article className="card-box shadow-3 card-box-me">
                <h2 className="card-box-title font-s-core">안녕하세요, {localStorage.getItem("me.name")} 님!</h2>
                <button className={isLoading ? "loading button float-right" : "button float-right"}
                        onClick={onClick}>로그아웃
                </button>
            </article>
        </>
    )
}

export default Me