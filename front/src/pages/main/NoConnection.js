import styled from 'styled-components'
import Page from '../../components/Page'
import Pomi from '../../components/Pomi'

const NoConnection = () => {
    const onClick = async () => {
        window.location.href = "/"
    }

    return (
        <Page title="접속 실패">
            <style>{"nav {opacity:0}"}</style>
            <Wrapper>
            <Pomi/>
            <p>정보현의 반려견, 정마루가 슬퍼합니다.</p>
            <ul>
                <li>인터넷 연결 없음</li>
                <li>제고라이프 서버 점검 중</li>
                <li>교육청 와이파이(jnedu_*) 사용 중</li>
            </ul>
            <p>문제 해결 후 아래 버튼을 눌러주세요.</p>
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