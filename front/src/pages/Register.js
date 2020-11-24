import React, {useEffect, useState} from 'react'
import {BrowserBarcodeReader} from '@zxing/library'
import CheckGreen from '../components/CheckGreen'
import hakbunToGCN from '../utils/hakbunToGCN'
import axios from 'axios'
import DatePicker from 'react-datepicker'

const Register = () => {
    useEffect(() => {
        document.title = "회원가입 | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [])

    const [videoActive, setVideoActive] = useState(false)
    const [barcode, setBarcode] = useState("")
    const [memCode, setMemCode] = useState("")
    const [step0Ok, setStep0Ok] = useState(false)
    const [isAuthBarcode, setIsAuthBarcode] = useState(false)
    const [step1Ok, setStep1Ok] = useState(false)
    const [step2Ok, setStep2Ok] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const [kitchenPass, setKitchenPass] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hakbun, setHakbun] = useState("")
    const [date, setDate] = useState(new Date(2004, 8, 8))
    const [residenceDorm, setResidenceDorm] = useState(true)
    const [tosRead, setTosRead] = useState("")
    const [isLoading, setLoading] = useState("button float-right")
    const [kitchenLoading, setKitchenLoading] = useState(false)

    let r = Math.random()
    let rm = true
    if (r > 0.5) {
        rm = false
    }
    const [isMale, setIsMale] = useState(rm)


    let minDate = new Date(2002, 0, 1)
    let maxDate = new Date(2005, 11, 31)

    const authScan = () => {
        setIsAuthBarcode(true)
        setStep0Ok(true)
    }

    const authLogin = () => {
        setStep0Ok(true)
    }

    let codeReader = new BrowserBarcodeReader()
    const startRead = async () => {
        try {
            setVideoActive(true)
            setErrMsg("")
            const result = await codeReader.decodeFromInputVideoDevice(undefined, 'video')
            setBarcode(result.text)
            codeReader.reset()
            setVideoActive(true)
            setStep1Ok(true)
        } catch (e) {
            console.log(e)
            setVideoActive(true)
            setErrMsg("카메라를 실행할 수 없어요. 설정에서 카메라 엑세스를 허용해주세요.")
        }
    }

    useEffect(() => {
        return () => {
            codeReader.reset()
        }
        // eslint-disable-next-line
    }, [])

    const postKitchen = async e => {
        setErrMsg("")
        setKitchenLoading(true)
        e.preventDefault()

        let {g, c, n} = hakbunToGCN(hakbun)
        if (
            (g < 1 || g > 3)
            || (c < 1 || (g === 1 && c > 8) || (g >= 2 && c > 10))
            || (n < 1 || n > 31)) {
            console.log(g, c, n)
            setErrMsg("학번이 유효하지 않습니다.")
            setKitchenLoading(false)
            return
        }

        let req = {Grade: g, Class: c, Number: n, Password: kitchenPass}
        try {
            let {data} = await axios.post(`register/kitchen`, req)
            setMemCode(data.Code)
            setStep1Ok(true)
        } catch {
            setErrMsg("로그인에 실패했습니다. 학번과 비밀번호를 확인해주세요.")
        }
        setKitchenLoading(false)
    }

    const postRegister = async e => {
        setErrMsg("")
        setLoading("loading button float-right")
        e.preventDefault()

        if (tosRead !== "on") {
            setErrMsg("이용약관과 개인정보 취급 동의서를 동의하지 않으면 진행할 수 없어요.")
            setLoading("button float-right")
            return
        }

        let {g, c, n} = hakbunToGCN(hakbun)
        if ((g === 1 && hakbun !== email.slice(6, 11))
            || (g < 1 || g > 3)
            || (c < 1 || (g === 1 && c > 8) || (g >= 2 && c > 10))
            || (n < 1 || n > 31)) {
            setErrMsg("이메일이 유효하지 않습니다.")
            setLoading("button float-right")
            return
        }

        if (g === 3) {
            setErrMsg("현재 3학년은 지원하지 않고 있어요.\n이는 스쿨키친 회원코드와 학생증 정보가 일치하지 않기 때문이에요.\n다른 방법을 모색할게요. 죄송합니다 선배님들!!")
            setLoading("button float-right")
            return
        }

        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()

        let req = {
            Email: email,
            Password: password,
            Grade: g,
            Class: c,
            Number: n,
            BirthdayYear: y,
            BirthdayMonth: m,
            BirthdayDay: d,
            IsDorm: residenceDorm,
            IsMale: isMale,
            Name: name,
        }

        if (barcode !== "") {
            req.Barcode = barcode
        } else {
            req.KitchenMemCode = memCode
        }

        try {
            await axios.post("register", req)
            setStep2Ok(true)
            // first-parse
            try {
                await axios.get(`first-parse/${email}`)
                alert("회원가입의 모든 과정이 끝났어요.\n회원이 된 것을 축하합니다!\n이제 로그인 화면으로 가요.")
            } catch (e) {
                alert("급식 정보를 가져오는 것을 실패했어요. 관리자에게 로그가 발송됐어요. 내일 로그인하면 해결되어 있을 거예요.")
            }
            window.location = "/login"
        } catch (e) {
            let msg = e.response.data.Content
            setErrMsg(msg)
        }
        setLoading("button float-right")
    }

    const [step1, setStep1] = useState(null)

    useEffect(() => {
        if (!step0Ok) {
            setStep1(
                <article className="card-box shadow-3">
                    <h2 className="card-title font-s-core px-2">STEP 0: 인증 방법 선택</h2>
                    <p>본인 인증 및 급식 정보를 가져오기 위한 인증이에요. 학생증 인증이 빠르고 쉬워요.</p>
                    <div className="flex flex-column">
                        <button className="button button-auth-choose" onClick={authScan}>학생증 스캔</button>
                        <button className="button button-auth-choose" onClick={authLogin}>급식신청사이트 로그인</button>
                    </div>
                </article>
            )
        } else {
            if (isAuthBarcode) {
                setStep1(
                    <article className={`card-box shadow-3 register-scan-box`}>
                        <h2 className={"card-title font-s-core px-2"}>STEP 1: 학생증 바코드 스캔</h2>
                        <div className={"register-scan-button"}>
                            {barcode === "" ?
                                <>
                                    {videoActive ? <video id="video"/>
                                        : <button onClick={startRead} className={"button"}>스캔하기</button>
                                    }
                                    <p>기종에 따라 초점이 잘 맞지 않을 수 있어요.</p>
                                </>
                                : <>
                                    <CheckGreen/>
                                    <h2>완료!</h2>
                                </>}
                        </div>
                    </article>
                )
            } else {
                setStep1(
                    <article className={`card-box shadow-3 register-step2-box`}>
                        <h2 className={"card-title font-s-core px-2"}>STEP 1: 급식신청사이트(플라이키친) 로그인</h2>
                        {!step1Ok ?
                            <form className={"p-2"} onSubmit={postKitchen}>
                                <div className={"flex flex-column"}>
                                    <label className={"my-2"} htmlFor={"hakbun-input"}>학번</label>
                                    <input type="text" value={hakbun} onChange={event => setHakbun(event.target.value)}
                                           className={"input"} id="hakbun-input" pattern="[0-9]*"
                                           placeholder="ex) 10106" maxLength={5} minLength={5}
                                           required autoComplete="off" inputMode="numeric"/>
                                </div>
                                <div className={"flex flex-column"}>
                                    <label className={"my-2"} htmlFor="password-input">비밀번호</label>
                                    <input type="password" value={kitchenPass}
                                           onChange={event => setKitchenPass(event.target.value)}
                                           className={"input"} id="password-input"
                                           minLength={1} placeholder={"플라이키친 비밀번호"} required autoComplete="off"
                                           />
                                </div>
                                <div className={"mt-4"}>
                                    <button type="submit"
                                            className={kitchenLoading ? "loading button float-right" : "button float-right"}>플라이키친
                                        로그인
                                    </button>
                                </div>
                            </form>
                            : <div className={"register-scan-box"}>
                                <CheckGreen/>
                                <h2>인증 완료!</h2>
                            </div>}
                    </article>
                )
            }
        }
        // eslint-disable-next-line
    }, [step0Ok, step1Ok, videoActive, barcode, hakbun, kitchenPass, kitchenLoading])

    const [step2, setStep2] = useState(null)
    useEffect(() => {
        if (step1Ok) {
            setStep2(
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
                                       className={"input"} id="hakbun-input" pattern="[0-9]*" placeholder={"ex) 10106"}
                                       required autoComplete={"off"} inputMode="numeric" minLength={5} maxLength={5}/>
                            </div>
                            <div className="flex flex-column">
                                <label className="my-2" htmlFor="residence-input">거주</label>
                                <div className="horizontal-group register-select">
                                    <button type="button" className={residenceDorm ? "button bg-green" : "button"}
                                            onClick={() => setResidenceDorm(true)}>기숙사
                                    </button>
                                    <button type="button" className={!residenceDorm ? "button bg-green" : "button"}
                                            onClick={() => setResidenceDorm(false)}>비기숙사
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-column">
                                <label className="my-2" htmlFor="birthday-input">생년월일</label>
                                <DatePicker className="input register-birthday" disabledKeyboardNavigation
                                            dateFormat="yyyy년 MM월 dd일" onChange={(d) => {
                                    console.log(d);
                                    setDate(d)
                                }}
                                            selected={date} minDate={minDate} maxDate={maxDate} todayButton="오늘"/>
                            </div>
                            <div className="flex flex-column">
                                <label className="my-2" htmlFor="residence-input">성별(주민등록상)</label>
                                <div className="horizontal-group register-select">
                                    <button type="button" className={isMale ? "button bg-blue" : "button"}
                                            onClick={() => setIsMale(true)}>남
                                    </button>
                                    <button type="button" className={!isMale ? "button bg-red" : "button"}
                                            onClick={() => setIsMale(false)}>여
                                    </button>
                                </div>
                            </div>
                            <div className={"flex flex-column"}>
                                <label className={"my-2"} htmlFor={"email-input"}>구글 클래스룸 이메일 주소</label>
                                <input type="email" value={email} onChange={event => setEmail(event.target.value)}
                                       className={"input"} id="email-input"
                                       pattern="gch(18|19|20)-1[01]\d[0-3]\d@h.jne.go.kr"
                                       placeholder={"ex) gch20-10901@h.jne.go.kr"} required
                                       inputMode="email"/>
                            </div>
                            <div className={"flex flex-column"}>
                                <label className={"my-2"} htmlFor="password-input">암호(8글자 이상)</label>
                                <input type="password" value={password}
                                       onChange={event => setPassword(event.target.value)}
                                       className={"input"} id="password-input"
                                       minLength={8} maxLength={30}
                                       placeholder="8글자 이상" required
                                       autoComplete="new-password"/>
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
            )
        }
        // eslint-disable-next-line
    }, [step1Ok, step2Ok, name, hakbun, email, password, tosRead, isLoading, date, residenceDorm, isMale])

    const [step3, setStep3] = useState(null)
    useEffect(() => {
        if (step2Ok) {
            setStep3(
                <article className={`card-box shadow-3 register-step2-box in-progress`}>
                    <h2 className={"card-title font-s-core"}>STEP 3: 급식 정보 가져오는 중...</h2>
                    <div className={"register-scan-box"}>
                        <div className={"spinner bw-6"}/>
                        <h2>잠시만 기다려주세요...</h2>
                        <p>급식 정보를 가져오고 있어요. 이 화면을 유지해주세요! 끝나면 로그인 화면으로 갈 거예요.</p>
                    </div>
                </article>
            )
        }
    }, [step2Ok])

    return (
        <>
            <h1 className="page-title">회원가입</h1>
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
                <p>제고라이프는 광양제철고등학교 1학년 2학년 학생 누구나 이용할 수 있습니다.</p>
                <p>iOS의 경우에는 Safari를, 안드로이드의 경우에는 Chrome을 사용해주세요. </p>
            </article>
            {step1}
            {step2}
            {step3}
            {errMsg !== "" ?
                <div className={"mb-5 bg-red-lightest red px-5 py-3 br-3 border-l bw-6 bc-red"}>
                    {errMsg}
                </div> : null}
        </>
    )
}

export default Register