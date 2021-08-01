import styled from 'styled-components'
import Page from '../../components/Page'

const sites = [
    {title: "학교 사이트", color: "#87ceeb", white: false, to: "http://gwangcheol.hs.jne.kr"},
    {title: "한빛 커뮤니티", color: "#03C75A", white: true, to: "https://cafe.naver.com/gwangcheolclub"},
    {title: "제라 인스타그램", color: "#8a3ab9", white: true, to: "https://instagram.com/zegolife"},
    {title: "급식 신청", color: "#586ba3", white: true, to: "http://gwang.i-zone.kr"},
    {title: "자가진단", color: "#073765", white: true, to: "https://hcs.eduro.go.kr"},
]

const Main = () => {
    return <Page title="바로가기">
        {sites.map(s => <WrapA key={s.title} rel="noopener noreferrer" target="_blank" href={s.to}><WebsiteBox color={s.color}
                                                                                                 white={s.white}>{s.title}</WebsiteBox></WrapA>)}
    </Page>
}

const WrapA = styled.a`
text-decoration: none;
`

const WebsiteBox = styled.article`
background-color: ${props => props.color};
color: ${props => props.white ? "white" : "black"};
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