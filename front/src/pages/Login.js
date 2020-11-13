import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
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
            localStorage.setItem("me.roles", respMe.data.Roles)
            localStorage.setItem("me.residence", respMe.data.Residence)

            if (respMe.data.Residence === undefined || respMe.data.Residence === 0) {
                window.location = "/help/slot-filling"
            } else {
                window.location = "/"
            }

        } catch (e) {
            setOkMsg("")
            setErrMsg("이메일 또는 암호가 올바르지 않습니다.")
        }
        setLoading("button float-right")
    }

    return (
        <>
            <h1 className="page-title">로그인</h1>
            <article className={"card-box shadow-3"}>
                <h2 className={"card-title font-s-core px-2"}>
                    <svg className={"icon mr-3"} viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m12.25 2h-1.1c-.33-1.15-1.39-2-2.65-2s-2.32.85-2.65 2h-1.1c-.41 0-.75.34-.75.75v1.5c0 .96.79 1.75 1.75 1.75h5.5c.96 0 1.75-.79 1.75-1.75v-1.5c0-.41-.34-.75-.75-.75z"/>
                        <path
                            d="m14.25 3h-.25v1.25c0 1.52-1.23 2.75-2.75 2.75h-5.5c-1.52 0-2.75-1.23-2.75-2.75v-1.25h-.25c-1.52 0-2.75 1.23-2.75 2.75v12.5c0 1.52 1.23 2.75 2.75 2.75h7.38l.22-1.23c.1-.56.36-1.06.76-1.47l.8-.8h-8.16c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.05 0 .09 0 .14.02h.01l3.6-3.6v-6.67c0-1.52-1.23-2.75-2.75-2.75zm-1 11.25h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75s-.34.75-.75.75zm0-3.25h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75s-.34.75-.75.75z"/>
                        <path
                            d="m12.527 24c-.197 0-.389-.078-.53-.22-.173-.173-.251-.419-.208-.661l.53-3.005c.026-.151.1-.291.208-.4l7.425-7.424c.912-.914 1.808-.667 2.298-.177l1.237 1.237c.683.682.683 1.792 0 2.475l-7.425 7.425c-.108.109-.248.182-.4.208l-3.005.53c-.043.008-.087.012-.13.012zm3.005-1.28h.01z"/>
                    </svg>
                    계정이 없으신가요?
                </h2>
                <p>광양제철고등학교 학생이라면 누구나 가입할 수 있습니다.</p>
                <p>OBT 등록 중지로 회원가입을 지금 할 수 없습니다. 정식 출시 때 만나요!</p>
                <NavLink to="/">
                    <button disabled className="button float-right">회원가입 하기</button>
                </NavLink>
            </article>
            {okMsg !== "" ?
                <div className={"mb-5 bg-green-lightest green px-5 py-3 br-3 border-l bw-6 bc-green"}>
                    {okMsg}
                </div> : null}
            {errMsg !== "" ?
                <div className={"mb-5 bg-red-lightest red px-5 py-3 br-3 border-l bw-6 bc-red"}>
                    {errMsg}
                </div> : null}
            <article className={"card-box shadow-3"}>
                <h2 className={"card-title font-s-core px-2"}>
                    <svg className={"icon mr-3"} height="512pt" viewBox="0 -32 512 512" width="512pt"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m298.667969 106.667969c0 58.910156-47.757813 106.664062-106.667969 106.664062s-106.667969-47.753906-106.667969-106.664062c0-58.910157 47.757813-106.667969 106.667969-106.667969s106.667969 47.757812 106.667969 106.667969zm0 0"/>
                        <path
                            d="m282.667969 256h-181.335938c-55.871093 0-101.332031 45.460938-101.332031 101.332031v74.667969c0 8.832031 7.167969 16 16 16h352c8.832031 0 16-7.167969 16-16v-74.667969c0-55.871093-45.460938-101.332031-101.332031-101.332031zm0 0"/>
                        <path
                            d="m506.902344 180.265625-74.667969-69.332031c-3.007813-2.796875-6.933594-4.246094-10.878906-4.246094-10.582031 0-16.023438 9.003906-16.023438 15.980469v48h-85.332031c-11.796875 0-21.332031 9.554687-21.332031 21.332031s9.535156 21.332031 21.332031 21.332031h85.332031v48c0 8.875 7.210938 16 16 16 3.96875 0 7.875-1.46875 10.902344-4.265625l74.667969-69.332031c3.242187-3.03125 5.097656-7.296875 5.097656-11.734375s-1.855469-8.703125-5.097656-11.734375zm0 0"/>
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
            <article className={"card-box shadow-3"}>
                <h2 className={"card-title font-s-core px-2"}>
                    암호를 잊으셨나요?
                </h2>
                <p>가입할 때 사용한 구글 클래스룸 이메일로 <a href="mailto:jh@beom.dev?subject=제고라이프 암호를 잊었습니다">jh@beom.dev</a>에 문의
                    부탁드립니다.</p>
            </article>
        </>
    )
}

export default Login