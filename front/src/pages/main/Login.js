import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {ErrorBox, SuccessBox} from "../../components/AlertBox"
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setLoading] = useState("button float-right")
    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")

    useEffect(() => {
        document.title = "로그인 | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
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

            const respMe = await axios.get("me")

            localStorage.setItem("me.name", respMe.data.Name)
            localStorage.setItem("me.id", respMe.data.ID)
            localStorage.setItem("me.barcode", respMe.data.Barcode)
            localStorage.setItem("me.grade", respMe.data.Grade)
            localStorage.setItem("me.class", respMe.data.Class)
            localStorage.setItem("me.year", respMe.data.BirthYear)
            localStorage.setItem("me.month", respMe.data.BirthMonth)
            localStorage.setItem("me.day", respMe.data.BirthDay)
            localStorage.setItem("me.sex", respMe.data.Sex)
            localStorage.setItem("me.roles", respMe.data.Roles)
            localStorage.setItem("me.residence", respMe.data.Residence)

            if (respMe.data.Residence === undefined || respMe.data.Residence === 0) {
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
        <>
            <h1 className="page-title">로그인</h1>
            <article className={"card-box shadow-3"}>
                <h2 className={"card-title font-s-core px-2"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus"
                         viewBox="0 0 24 24">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
                        <path d="M16 11h6m-3 -3v6"/>
                    </svg>
                    계정이 없으신가요?
                </h2>
                <p>광양제철고등학교 학생이라면 누구나 가입할 수 있습니다.</p>
                <NavLink to="/register">
                    <button className="button float-right">회원가입 하기</button>
                </NavLink>
            </article>
            <article className={"card-box shadow-3"}>
                <h2 className={"card-title font-s-core px-2"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler" viewBox="0 0 24 24">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="7" r="4"/>
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
                    </svg>
                    로그인
                </h2>
                <p>제고라이프의 기능을 더 즐겨보세요!</p>
                <div className={"login-box"}>
                    <form className={"p-2"} onSubmit={onSubmit}>
                        <div className={"flex flex-column"}>
                            <label className={"my-2"} htmlFor={"email-input"}>클래스룸 이메일 주소</label>
                            <input type="email" value={email} onChange={event => setEmail(event.target.value)}
                                   className={"input"} id="email-input" placeholder="이메일 입력" required/>
                        </div>
                        <div className={"flex flex-column mt-3"}>
                            <label className={"my-2"} htmlFor="password-input">암호</label>
                            <input type="password" value={password} onChange={event => setPassword(event.target.value)}
                                   className={"input"} id="password-input" placeholder="암호 입력" required/>
                        </div>
                        <div className={"mt-4"}>
                            <button type="submit" className={isLoading}>로그인</button>
                        </div>
                    </form>
                </div>
            </article>
            <SuccessBox>{okMsg}</SuccessBox>
            <ErrorBox>{errMsg}</ErrorBox>
            <article className={"card-box shadow-3"}>
                <h2 className={"card-title font-s-core px-2"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler" viewBox="0 0 24 24">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="10" cy="10" r="7"/>
                        <path d="M21 21l-6 -6"/>
                        <line x1="10" y1="13" x2="10" y2="13.01"/>
                        <path d="M10 10a1.5 1.5 0 1 0 -1.14 -2.474"/>
                    </svg>
                    암호를 잊으셨나요?
                </h2>
                <p>가입할 때 사용한 구글 클래스룸 이메일로 <a href="mailto:jh@beom.dev?subject=제고라이프 암호를 잊었습니다">jh@beom.dev</a>에 문의
                    하거나 Instagram <a rel="noopener noreferrer" target="_blank"
                                     href="https://instagram.com/jedbeom">@jedbeom</a> 또는 <a rel="noopener noreferrer"
                                                                                             target="_blank"
                                                                                             href="https://instagram.com/zchien._.b">@zchien._.b</a>에
                    DM을 보내주세요!</p>
            </article>
        </>
    )
}

export default Login