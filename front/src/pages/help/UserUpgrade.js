import React, {useState} from 'react'
import axios from 'axios'

import Page from '../../components/Page'
import {ErrorBox, InfoBox} from '../../components/AlertBox'
import hakbunToGCN from '../../utils/hakbunToGCN'
import {validateGCN} from '../../utils/validate'
import saveUser from '../../utils/saveUser'


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
            const {data} = await axios.get(`me`)
            saveUser(data)
            alert("정보 추가에 성공했어요!")
            window.location = "/"
        } catch (e) {
            if (e.response.data.Content) {
                setErrMsg(e.response.data.Content)
            } else {
                setErrMsg("정보 추가에 실패했어요... 다시 시도해보시겠어요?")
            }
            setLoading(false)
        }
    }

    return (
        <Page title="새 학번 입력">
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
        </Page>
    )
}

export default UserUpgrade