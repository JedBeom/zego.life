import axios from 'axios'
import { useState } from 'react';
import Page from '../../components/Page'
import {ErrorBox, SuccessBox} from '../../components/AlertBox'

import {Item, ItemDescription, ItemTitle, Section} from '../../components/Section'

const Settings = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme"))
    const [okMsg, setOkMsg] = useState()
    const [errMsg, setErrMsg] = useState()

    const changeTheme = e => {
        setTheme(e.target.value)
        localStorage.setItem("theme", e.target.value)
        window.location.href = "/settings"
    }

    const reload = () => {
        sessionStorage.clear()
        window.location.reload()
    }

    const deleteTimetable = async () => {
        sessionStorage.clear()
        try {
            await axios.delete(`timetables/me`)
            setOkMsg("시간표를 초기화했습니다.")
        } catch {
            setErrMsg("시간표 초기화에 실패했습니다.")
        }
    }

    return <Page title="설정" back>
        <SuccessBox>{okMsg}</SuccessBox>
        <ErrorBox>{errMsg}</ErrorBox>
        <Section>
            <Item>
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
            </Item>
            <Item>
                <ItemTitle>앱 새로고침</ItemTitle>
                <ItemDescription>업데이트가 필요하거나, 기능이 잘 작동하지 않을 때.</ItemDescription>
                <button className="button" onClick={reload}>새로고침</button>
            </Item>
            <Item>
                <ItemTitle>시간표 초기화</ItemTitle>
                <ItemDescription>내 선택과목을 초기화합니다.</ItemDescription>
                <button className="button" onClick={deleteTimetable}>초기화</button>
            </Item>
        </Section>
    </Page>
}

export default Settings