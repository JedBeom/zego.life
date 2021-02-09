import React, {useState} from 'react'
import {SuccessBox, WarningBox} from '../../components/AlertBox'
import Back from "../../components/Back"

import axios from 'axios'

const CampaignNew = () => {

    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [imageSrc, setImageSrc] = useState("")
    const [link, setLink] = useState("")
    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const [loading, setLoading] = useState(false)

    const onClick = async () => {
        setLoading(true)
        setOkMsg("")
        setErrMsg("")
        const p = {
            Title: title,
            SubTitle: subTitle,
            ImageSrc: imageSrc,
            Link: link,
        }

        try {
            await axios.post(`campaigns`, p)
            setOkMsg("완료")
            setTitle("")
            setSubTitle("")
            setImageSrc("")
            setLink("")
        } catch (e) {
            setErrMsg(`${e}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <h1 className="page-title"><Back content="캠페인 생성"/></h1>
            <SuccessBox>{okMsg}</SuccessBox>
            <WarningBox>{errMsg}</WarningBox>
            <div className="flex flex-column">
                <label className="my-2">제목</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                       className="input" placeholder="제목"/>
            </div>
            <div className="flex flex-column">
                <label className="my-2">부제목</label>
                <input type="text" value={subTitle} onChange={e => setSubTitle(e.target.value)}
                       className="input" placeholder="부제목"/>
            </div>
            <div className="flex flex-column">
                <label className="my-2">이미지 경로</label>
                <input type="text" value={imageSrc} onChange={e => setImageSrc(e.target.value)}
                       className="input" placeholder="/img/src/asdf.png"/>
            </div>
            <div className="flex flex-column">
                <label className="my-2">링크</label>
                <input type="text" value={link} onChange={e => setLink(e.target.value)}
                       className="input" placeholder="링크"/>
            </div>
            <button className={loading ? "button float-right mt-2 loading" : "button float-right mt-2"}
                    onClick={onClick}>제출
            </button>
        </>
    )
}

export default CampaignNew