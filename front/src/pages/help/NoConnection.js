import React, {useState} from 'react'
import axios from 'axios'

const NoConnection = () => {
    const [loading, setLoading] = useState(false)
    const healthCheck = async () => {
        setLoading(true)
        try {
            await axios.get(`health/connection`)
            window.location = "/"
        } catch (e) {
            if (!e.response) {
                alert("연결에 실패했습니다.")
                setLoading(false)
            } else {
                window.location = "/"
            }
        }
    }

    return (
        <>
            <h1 className="page-title">서버에 연결할 수 없음</h1>
            <p>서버와 통신할 수 없습니다. 다음 상황 중 하나인지 확인해주세요.</p>
            <ul style={{marginLeft: "1.5rem"}}>
                <li>와이파이, 데이터가 꺼져있음</li>
                <li>학교 와이파이를 사용 중</li>
                <li>서버 점검 중</li>
            </ul>
            <style>nav {'{opacity: 0}'}</style>
            <button className={loading ? "button float-right loading" : "button float-right"} onClick={healthCheck}>
                재시도
            </button>
        </>
    )
}

export default NoConnection