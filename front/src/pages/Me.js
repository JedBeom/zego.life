import React, {useState} from 'react'
import axios from 'axios'
import Barcode from 'react-barcode'

const Me = () => {
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
        <article className="card-box shadow-3 card-box-me">
            <div className="flex justify-between">
                <h2 className="card-box-title font-s-core">안녕하세요, {localStorage.getItem("me.name")} 님!</h2>
                <button className={isLoading ? "loading button" : "button"} onClick={onClick}>로그아웃</button>
            </div>
            <div className="flex justify-center mt-3">
                {barcode !== null && barcode !== "" ?
                    <Barcode value={barcode} format="CODE128" height="40" displayValue={false}/> : null}
            </div>
        </article>
    )
}

export default Me