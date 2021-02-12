import React, {useState} from 'react'
import {ErrorBox, InfoBox} from '../../components/AlertBox'
import hakbunToGCN from '../../utils/hakbunToGCN'
import {validateGCN} from '../../utils/validate'

import axios from 'axios'

const UserUpgrade = () => {
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [hakbun, setHakbun] = useState("")

    const postUserUpgrade = async (e) => {
        setLoading(true)
        e.preventDefault()

        const {g, c, n} = hakbunToGCN(hakbun)
        if ((!validateGCN(g, c, n)) || (Number(localStorage.getItem("me.grade")) >= g)) {
            setErrMsg("학번이 올바르지 않습니다.")
            setLoading(false)
            return
        }

        let p = {
            Grade: g,
            Class: c,
            Number: n,
        }

        try {
            await axios.post(`/me/upgrade`, p)
            alert("정보 추가에 성공했어요!")
            window.location = "/"
        } catch (e) {
            setErrMsg("정보 추가에 실패했어요... 다시 시도해보시겠어요?")
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="page-title">새 반 정보 추가</h1>
            <InfoBox>
                2021학년도의 새 학번을 입력해주세요.
            </InfoBox>
            <form className={"p-2"} onSubmit={postUserUpgrade}>
                <div className={"flex flex-column"}>
                    <label className={"my-2"} htmlFor={"hakbun-input"}>학번</label>
                    <input type="text" value={hakbun} onChange={event => setHakbun(event.target.value)}
                           className={"input"} id="hakbun-input" pattern="[0-9]*"
                           placeholder="ex) 10106" maxLength={5} minLength={5}
                           required autoComplete="off" inputMode="numeric"/>
                </div>
                <ErrorBox>
                    {errMsg}
                </ErrorBox>
                <div className={"mt-4"}>
                    <button type="submit"
                            className={loading ? "button float-right loading" : "button float-right"}>제출!
                    </button>
                </div>
            </form>
        </>
    )
}

export default UserUpgrade