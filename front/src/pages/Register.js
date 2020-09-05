import React, {Fragment, useEffect, useState} from 'react'
import {BrowserBarcodeReader} from '@zxing/library'
import CheckGreen from '../components/CheckGreen'
import hakbunToGCN from '../utils/hakbunToGCN'
import axios from 'axios'

const Register = () => {
    useEffect(() => {
        document.title = "회원가입 | 제고라이프"
        if (window.navigator.standalone && (/iphone|ipod|ipad/gi).test(navigator.platform)) {
            alert("iOS 구버전의 경우 회원가입은 홈앱에서는 불가능합니다. (바코드 인식 때문)\n iOS 최신 버전이 아니면 Safari에서 부탁드립니다.")
        }
    }, [])

    const [videoActive, setVideoActive] = useState(false)
    const [barcode, setBarcode] = useState("")
    const [step1Ok, setStep1Ok] = useState(false)
    const [step2Ok, setStep2Ok] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hakbun, setHakbun] = useState("")
    const [tosRead, setTosRead] = useState("")
    const [isLoading, setLoading] = useState("button float-right")

    let codeReader = new BrowserBarcodeReader()
    const startRead = async () => {
        try {
            setVideoActive(true)
            setErrMsg("")
            const result = await codeReader.decodeFromInputVideoDevice(undefined, 'video')
            setBarcode(result.text)
            codeReader.reset()
            setVideoActive(false)
            setStep1Ok(true)
        } catch (e) {
            setVideoActive(false)
            setErrMsg("카메라를 실행할 수 없습니다. 카메라를 거부하지 않았는지 확인해주십시오.")
        }
    }

    useEffect(() => {
        return () => {
            codeReader.reset()
        }
        // eslint-disable-next-line
    }, [])

    const postRegister = async e => {
        setErrMsg("")
        setLoading("loading button float-right")
        e.preventDefault()

        if (tosRead !== "on") {
            setErrMsg("이용약관과 개인정보 취급 동의서를 동의하지 않으면 진행할 수 없습니다.")
            setLoading("button float-right")
            return
        }

        let {g, c, n} = hakbunToGCN(hakbun)
        if ((g === 1 && hakbun !== email.slice(6, 11))
            || (g < 1 || g > 3)
            || (c < 1 || c > 9)
            || (n < 1 || n > 31)) {
            setErrMsg("학번이 유효하지 않습니다.")
            setLoading("button float-right")
            return
        }

        if (g === 3) {
            setErrMsg("현재 3학년은 지원하지 않고 있어요.\n이는 스쿨키친 회원코드와 학생증 정보가 일치하지 않기 때문이에요.\n다른 방법을 모색할게요. 죄송합니다 선배님들!!")
            setLoading("button float-right")
            return
        }

        let req = {
            Email: email,
            Password: password,
            Grade: g,
            Class: c,
            Number: n,
            Name: name,
            Barcode: barcode
        }

        try {
            await axios.post("register", req)
            setStep2Ok(true)
            // first-parse
            try {
                await axios.get(`first-parse/${email}`)
                alert("회원가입의 모든 과정이 끝났어요.\n회원이 된 것을 축하합니다!\n이제 로그인 화면으로 가요.")
            } catch (e) {
                alert("급식 정보를 가져오는 것을 실패했어요. 관리자에게 로그가 발송됐어요. 내일 로그인하면 해결되어 있을거에요.")
            }
            window.location = "/login"
        } catch (e) {
            let msg = e.response.data.Content
            setErrMsg(msg)
        }
        setLoading("button float-right")


    }

    return (
        <Fragment>
            <article className={`card-box shadow-3`}>
                <h2 className={"card-title font-s-core px-2"}>
                    <svg className={"icon mr-3"} viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m12.25 2h-1.1c-.33-1.15-1.39-2-2.65-2s-2.32.85-2.65 2h-1.1c-.41 0-.75.34-.75.75v1.5c0 .96.79 1.75 1.75 1.75h5.5c.96 0 1.75-.79 1.75-1.75v-1.5c0-.41-.34-.75-.75-.75z"/>
                        <path
                            d="m14.25 3h-.25v1.25c0 1.52-1.23 2.75-2.75 2.75h-5.5c-1.52 0-2.75-1.23-2.75-2.75v-1.25h-.25c-1.52 0-2.75 1.23-2.75 2.75v12.5c0 1.52 1.23 2.75 2.75 2.75h7.38l.22-1.23c.1-.56.36-1.06.76-1.47l.8-.8h-8.16c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.05 0 .09 0 .14.02h.01l3.6-3.6v-6.67c0-1.52-1.23-2.75-2.75-2.75zm-1 11.25h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75s-.34.75-.75.75zm0-3.25h-9.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h9.5c.41 0 .75.34.75.75s-.34.75-.75.75z"/>
                        <path
                            d="m12.527 24c-.197 0-.389-.078-.53-.22-.173-.173-.251-.419-.208-.661l.53-3.005c.026-.151.1-.291.208-.4l7.425-7.424c.912-.914 1.808-.667 2.298-.177l1.237 1.237c.683.682.683 1.792 0 2.475l-7.425 7.425c-.108.109-.248.182-.4.208l-3.005.53c-.043.008-.087.012-.13.012zm3.005-1.28h.01z"/>
                    </svg>
                    회원가입
                </h2>
                <p>제고라이프 회원가입은 아래 단계를 거쳐야해요.</p>
                <ol className={"ml-6"}>
                    <li>학생증 바코드 스캔</li>
                    <li>개인정보 입력</li>
                </ol>
                <p>iOS의 경우에는 Safari를, 안드로이드의 경우에는 Chrome을 사용해주세요. </p>
            </article>
            <article className={`card-box shadow-3 register-scan-box`}>
                <h2 className={"card-title font-s-core px-2"}>STEP 1: 학생증 바코드 스캔</h2>
                <div className={"register-scan-button"}>
                    {barcode === "" ?
                        <Fragment>
                            {videoActive ? <video id="video"/>
                                : <button onClick={startRead} className={"button"}>스캔하기</button>
                            }
                        </Fragment>
                        : <Fragment>
                            <CheckGreen/>
                            <h2>완료!</h2>
                        </Fragment>}
                </div>
            </article>
            {errMsg !== "" ?
                <div className={"mb-5 bg-red-lightest red px-5 py-3 br-3 border-l bw-6 bc-red"}>
                    {errMsg}
                </div> : null}
            {step1Ok ?
                <article className={`card-box shadow-3 register-step2-box`}>
                    <h2 className={"card-title font-s-core px-2"}>STEP 2: 개인정보 입력</h2>
                    {!step2Ok ?
                        <form className={"p-2"} onSubmit={postRegister}>
                            <div className={"flex flex-column"}>
                                <label className={"my-2"} htmlFor={"name-input"}>이름</label>
                                <input type="text" value={name} onChange={event => setName(event.target.value)}
                                       className={"input"} id="name-input" minLength={2} placeholder={"ex) 김광철"}
                                       required/>
                            </div>
                            <div className={"flex flex-column"}>
                                <label className={"my-2"} htmlFor={"hakbun-input"}>학번</label>
                                <input type="text" value={hakbun} onChange={event => setHakbun(event.target.value)}
                                       className={"input"} id="hakbun-input" pattern="\d{5}" placeholder={"ex) 10106"}
                                       required/>
                            </div>
                            <div className={"flex flex-column"}>
                                <label className={"my-2"} htmlFor={"email-input"}>구글 클래스룸 이메일 주소</label>
                                <input type="email" value={email} onChange={event => setEmail(event.target.value)}
                                       className={"input"} id="email-input"
                                       pattern="gch(18|19|20)-1[01]\d[0-3]\d@h.jne.go.kr"
                                       placeholder={"ex) gch20-10901@h.jne.go.kr"} required/>
                            </div>
                            <div className={"flex flex-column"}>
                                <label className={"my-2"} htmlFor="password-input">암호</label>
                                <input type="password" value={password}
                                       onChange={event => setPassword(event.target.value)}
                                       className={"input"} id="password-input" pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                       minLength={8} placeholder={"8글자 이상, 대문자 포함"} required/>
                            </div>
                            <div className={"flex items-center mt-4"}>
                                <input type="checkbox" className={"checkbox mr-3"} id="tnc-input"
                                       onChange={event => setTosRead(event.target.value)}/>
                                <label className={"form-check-label"} htmlFor="tnc-input"><a
                                    href="http://simp.ly/p/fPd30c" rel="noopener noreferrer"
                                    target="_blank">이용약관</a>과 <a href="http://simp.ly/p/DXDwql"
                                                                 rel="noopener noreferrer" target="_blank">개인정보 취급
                                    동의서</a>를 읽었으며 이에
                                    동의합니다.
                                </label>
                            </div>
                            <div className={"mt-4"}>
                                <button type="submit" className={isLoading}>회원가입</button>
                            </div>
                        </form>
                        : <div className={"register-scan-box"}>
                            <CheckGreen/>
                            <h2>회원가입 성공!</h2>
                            <p>하지만 아직 끝난 게 아니에요... STEP 3까지 기다려주세요!</p>
                        </div>}
                </article>
                : null}
            {step2Ok ?
                <article className={`card-box shadow-3 register-step2-box in-progress`}>
                    <h2 className={"card-title font-s-core"}>STEP 3: 급식 정보 가져오는 중...</h2>
                    <div className={"register-scan-box"}>
                        <div className={"spinner bw-6"}/>
                        <h2>잠시만 기다려주세요...</h2>
                        <p>급식 정보를 가져오고 있어요. 끝나면 로그인 화면으로 갈거에요.</p>
                    </div>
                </article>
                : null}
        </Fragment>
    )
}

export default Register