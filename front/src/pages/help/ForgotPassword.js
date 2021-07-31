import styled from 'styled-components'

import Page from '../../components/Page'

import InstagramIcon from '../../icons/Instagram'
import MailIcon from '../../icons/Mail'

const ForgotPassword = () => {
    return <Page title="암호를 잊었습니다" back>
        <Wrapper>
            <div>
                <h2>제고라이프 인스타그램에 DM을 보내거나</h2>
                <a href="https://instagram.com/zegolife" rel="noopener noreferrer" target="_blank">
                    <button className="button"><InstagramIcon/>@zegolife</button>
                </a>
            </div>
            <hr/>
            <div>
                <h2>개발자에게 이메일을 보내세요</h2>
                <a href="mailto:jh@beom.dev?subject=제고라이프 암호를 잊었습니다">
                    <button className="button"><MailIcon/>이메일 보내기</button>
                </a>
            </div>
        </Wrapper>
    </Page>
}

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: stretch;
height: 100%;
text-align: center;
word-break: keep-all;
& hr {
    margin: 2rem;
}

& div {
    padding: 3rem;
}

& button {
    margin-top: 2rem;
}

& .icon {
    width: 1.5em;
    height: 1.5em;
}
`

export default ForgotPassword