import React, {useState} from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'

const Settings = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme"))

    const changeTheme = e => {
        setTheme(e.target.value)
        localStorage.setItem("theme", e.target.value)
        window.location.reload()
    }

    return <Page title="설정" back>
        <Section>
            <div>
                <ItemTitle>테마</ItemTitle>
                <ItemDescription>제고라이프의 테마를 변경합니다. 테마는 예고 없이 사라질 수 있습니다.</ItemDescription>
                <select className="select" value={theme} onChange={changeTheme}>
                    <optgroup label="기본">
                        <option value="light">라이트</option>
                        <option value="dark">다크</option>
                    </optgroup>
                    <optgroup label="단색">
                        <option value="pink-55">핑크 0505</option>
                        <option value="pure-dark">퓨어 다크</option>
                        <option value="logo-blue">로고블루</option>
                    </optgroup>
                    <optgroup label="그라디언트">
                        <option value="linear-indigo">리니어 인디고</option>
                        <option value="linear-pink">리니어 핑크</option>
                        <option value="lonely-sky">론리 스카이</option>
                        <option value="clear-water">클리어 워터</option>
                        <option value="tropical-dark">트로피칼 다크</option>
                        <option value="pupple-mint-dark">퍼플 민트 다크</option>
                    </optgroup>
                    <optgroup label="스페셜">
                    </optgroup>
                </select>
            </div>
            <div>
                <ItemTitle>앱 새로고침</ItemTitle>
                <ItemDescription>업데이트가 필요하거나, 기능이 잘 작동하지 않을 때.</ItemDescription>
                <button className="button" onClick={() => window.location.reload()}>새로고침</button>
            </div>
        </Section>
    </Page>
}

const Section = styled.article`
padding-top: 1rem;
padding-bottom: .5rem;
border-top-color: var(--site-text-color);
border-top-width: .1rem;
border-top-style: solid;
-webkit-font-smoothing: antialiased;

& div {
    margin-bottom: 1em;
}
`

const ItemTitle = styled.h4`
font-weight: 500;
font-size: 1rem;
margin-bottom: .25rem;
`

const ItemDescription = styled.p`
color: #cecece;
font-weight: 700;
font-size: .8rem;
margin-bottom: 1rem;
`

/*
const Select = styled.select`
font-family: "Spoqa Han Sans Neo";

background-color: transparent;
background-clip: padding-box;
display: inline-block;
padding: .5rem 0;
border: none;
border-bottom: 0.15rem grey solid;
color: inherit;

outline: none;
border-radius: 0;

font-size: 1.2rem;

text-align: center;
width: 100%;
padding-right: 1rem;
padding-bottom: .5rem;

& optgroup::before {
    color: black;
}

& option {
    padding-bottom: 1em;
}

&:focus {
    border-bottom: 0.15rem #4384e8 solid;
}
`
*/

export default Settings