import React from 'react'

const NoConnection = () => {
    const onClick = async () => {
        window.location.href = "/"
    }

    return (
        <>
            <h1 className="page-title">연결 없음</h1>
            <style>{"nav {opacity:0}"}</style>
            <p>다음 상황 중 하나입니다.</p>
            <ul>
                <li>학교 와이파이 사용 중</li>
                <li>데이터 또는 와이파이가 꺼져있어 인터넷 연결 없음</li>
                <li>제고라이프 서버 점검 중</li>
            </ul>
            <p>아래 새로고침 버튼을 눌러 재시도 해보세요.</p>
            <button onClick={onClick} className="button">새로고침</button>
        </>
    )
}

export default NoConnection