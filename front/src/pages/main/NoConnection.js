import React from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import Pomi from '../../components/Pomi'

const NoConnection = () => {
    const onClick = async () => {
        window.location.href = "/"
    }

    return (
        <Page title="연결 없음">
            <style>{"nav {opacity:0}"}</style>
            <Wrapper>
            <Pomi/>
            <p>다음 상황 중 하나입니다.</p>
            <ul>
                <li>인터넷 연결 없음</li>
                <li>제고라이프 서버 점검 중</li>
            </ul>
            <p>아래 새로고침 버튼을 눌러 재시도 해보세요.</p>
            <button onClick={onClick} className="button">새로고침</button>
            </Wrapper>
        </Page>
    )
}

const Wrapper = styled.div`
& img {
    height: 15rem;
}

& ul {
    margin: .5rem;
}
`

export default NoConnection