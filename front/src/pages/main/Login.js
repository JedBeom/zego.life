import React, {useEffect, useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'

import Page from '../../components/Page'
import {ErrorBox, SuccessBox} from "../../components/AlertBox"
import '../../styles/campaigns.css'

import KeyIcon from '../../icons/Key'
import UserAddIcon from '../../icons/UserAdd'
import {MoreBox, MoreBoxContainer} from '../../components/MoreBox'
import saveUser from '../../utils/saveUser'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setLoading] = useState("button float-right")
    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        if (localStorage.getItem("me.name") != null) {
            window.location = "/"
            return null
        }
    }, [])


    const onSubmit = async event => {
        setErrMsg("")
        event.preventDefault()

        localStorage.clear()

        setLoading("loading button float-right")
        let req = {"Email": email, "Password": password}
        try {
            const {data} = await axios.post("login", req)
            setOkMsg("로그인 성공! 곧 메인 페이지로 이동합니다.")
            localStorage.setItem("token", data.token)

            const {data: user} = await axios.get("me")

            saveUser(user)

            if (user.Residence === undefined || user.Residence === 0) {
                window.location = "/help/slot-filling"
            } else {
                window.location = "/"
            }

        } catch (e) {
            setOkMsg("")
            setErrMsg("이메일 또는 암호가 올바르지 않습니다. 혹시 대문자를 빠트렸나요?")
        }
        setLoading("button float-right")
    }

    return (
        <Page title="로그인">
            <Article>
                <form className="p-2 mt-4" onSubmit={onSubmit}>
                    <div className="flex flex-column">
                        <label className={"my-2"} htmlFor={"email-input"}>클래스룸 이메일 주소</label>
                        <input type="email" value={email} onChange={event => setEmail(event.target.value)}
                               className="input-form" id="email-input" placeholder="이메일 입력" required/>
                    </div>
                    <div className="flex flex-column mt-3">
                        <label className={"my-2"} htmlFor="password-input">암호</label>
                        <input type="password" value={password} onChange={event => setPassword(event.target.value)}
                               className="input-form" id="password-input" placeholder="암호 입력" required/>
                    </div>
                    <div className="mt-4">
                        <button type="submit" className={isLoading}>로그인</button>
                    </div>
                </form>
            </Article>
            <MoreBoxContainer>
                <MoreBox icon={<KeyIcon/>} title="암호 잊음" to="/help/forgot-password"/>
                <MoreBox icon={<UserAddIcon/>} title="회원가입" to="/register"/>
            </MoreBoxContainer>
            <SuccessBox>{okMsg}</SuccessBox>
            <ErrorBox>{errMsg}</ErrorBox>
        </Page>
    )
}

const Article = styled.article`
&::after {
    content: "";
    clear: both;
    display: table;
}
`

export default Login