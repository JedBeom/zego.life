import React from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'

const sites = [
    {title: "학교 사이트", color: "#ef476f", to: "http://gwangcheol.hs.jne.kr"},
    {title: "한빛 커뮤니티", color: "#FFD166", to: "https://cafe.naver.com/gwangcheolclub"},
    {title: "제라 인스타그램", color: "#118AB2", to: "https://instagram.com/zegolife"},
]

let foot = <footer className="copyright">
    '바로가기' 대신에 좋은 기능이 있을까요? '피드백 보내기'로 알려주세요.
</footer>

const Main = () => {
    return <Page title="바로가기" foot={foot}>
        {sites.map(s => <WrapA rel="noopener noreferrer" target="_blank" href={s.to}><WebsiteBox color={s.color}>{s.title}</WebsiteBox></WrapA>)}
    </Page>
}

const WrapA = styled.a`
text-decoration: none;
`

const WebsiteBox = styled.article`
background-color: ${props => props.color};
padding: 1.5rem;
margin: 1rem;
border-radius: .5rem;
font-size: 1.2rem;
font-weight: 900;

transition: .5s;

&:hover {
    transform: scale(1.05);
}
`


export default Main