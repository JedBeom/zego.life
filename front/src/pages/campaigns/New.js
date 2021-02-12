import React, {useEffect, useState} from 'react'
import {SuccessBox, WarningBox} from '../../components/AlertBox'
import Back from "../../components/Back"
import CampaignBox from '../../components/CampaignBox'
import {validURL} from '../../utils/validate'
import {timestampHyphen} from '../../utils/timestamp'

import axios from 'axios'
import {withRouter} from 'react-router-dom'

import "react-datepicker/dist/react-datepicker.css";

const CampaignNew = ({match, history}) => {

    const [isNew, setNew] = useState(true)

    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [link, setLink] = useState("")
    const [file, setFile] = useState(null)
    const [prvImageSrc, setPrvImageSrc] = useState("")
    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const [fileElement, setFileElement] = useState(null)
    const [startDate, setStartDate] = useState(new Date().toISOString().substr(0, 10))
    const [startHour, setStartHour] = useState(0)
    const [endDate, setEndDate] = useState(new Date().toISOString().substr(0, 10))
    const [endHour, setEndHour] = useState(0)

    const [totalDate, setTotalDate] = useState({day: 0, hour: 0, totalHour: 0})
    const [totalPrice, setPrice] = useState(0)

    const [imagePreview, setImagePreview] = useState("")
    const [reader, setReader] = useState(new FileReader())

    const [initialLoading, setInitialLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        reader.onload = e => {
            setImagePreview(e.target.result)
        }

        if (match.params.id) {
            setNew(false)
            getCampaign()
        }
    }, [])

    useEffect(() => {
        let start = new Date(startDate)
        let end = new Date(endDate)
        start.setHours(startHour, 0)
        end.setHours(endHour, 0)

        const diff = end - start
        const calc = diff / 1000 / 60 / 60
        const day = Math.floor(calc / 24)
        const hour = calc - day * 24
        setTotalDate({day: day, hour: hour, totalHour: calc})
        setPrice(calc * 20)
    }, [startDate, endDate, startHour, endHour])

    const getCampaign = async () => {
        setInitialLoading(true)
        try {
            const {data} = await axios.get(`campaigns-not-payed/${match.params.id}`)
            setTitle(data.Title)
            setSubTitle(data.SubTitle)
            setLink(data.Link)
            setPrvImageSrc(data.ImageSrc)
            setImagePreview(data.ImageSrc)
            let start = new Date(data.StartAt)
            setStartDate(timestampHyphen(start))
            setStartHour(start.getHours())
            let end = new Date(data.EndAt)
            setEndDate(timestampHyphen(end))
            setEndHour(end.getHours())
        } catch (e) {
            setErrMsg("로딩에 실패했어요.")
        } finally {
            setInitialLoading(false)
        }
    }

    const onClick = async () => {
        setLoading(true)
        setOkMsg("")
        setErrMsg("")

        if (!title) {
            setErrMsg("제목을 써주세요.")
            setLoading(false)
            return
        }

        if (!subTitle) {
            setErrMsg("부제목을 써주세요.")
            setLoading(false)
            return
        }

        if (link) {
            if (!validURL(link)) {
                setErrMsg("유효한 URL을 입력해주세요.")
                setLoading(false)
                return
            }
        }

        if (totalDate.totalHour <= 0) {
            setErrMsg("진행 시간은 0 이하일 수 없습니다.")
            setLoading(false)
            return
        }

        let start = new Date(startDate)
        let end = new Date(endDate)
        start.setHours(startHour, 0)
        end.setHours(endHour, 0)

        let today = new Date()

        if (start >= end) {
            setErrMsg("시작 날짜는 종료 날짜보다 먼저여야 합니다.")
            setLoading(false)
            return
        }

        if ((start - today) / 1000 / 60 / 60 <= 24) {
            setErrMsg("시작 날짜는 지금으로부터 24시간 이상 뒤여야 합니다.")
            setLoading(false)
            return
        }

        let p = {
            Title: title,
            SubTitle: subTitle,
            Link: link,
            StartAt: start,
            EndAt: end,
        }

        if (!prvImageSrc) {
            const imageSrc = await uploadImage()
            if (imageSrc === false) {
                setLoading(false)
                return
            }
            p.ImageSrc = imageSrc
        } else {
            p.ImageSrc = prvImageSrc
        }

        try {
            if (isNew) {
                const {data} = await axios.post(`campaigns`, p)
                history.push(`/campaigns/${data.ID}/payment`)
            } else {
                const {data} = await axios.patch(`campaigns-not-payed/${match.params.id}`, p)
                history.push(`/campaigns/${data.ID}/payment`)
            }
        } catch (e) {
            setErrMsg(`${e}`)
        } finally {
            setLoading(false)
        }
    }

    const uploadImage = async () => {
        if (!file) return ""

        const formData = new FormData()
        formData.append("file", file)

        try {
            const {data} = await axios.post(`campaigns/image`, formData, {
                params: {
                    "type": file.type,
                    "name": file.name
                }
            })
            setPrvImageSrc("")
            return data
        } catch (e) {
            setErrMsg(`${e}`)
        }
        return false
    }

    const fileName = () => {
        if (file) {
            return file.name
        }
    }

    if (initialLoading) {
        return <>
            <div className="loader"/>
        </>
    }

    return (
        <>
            <h1 className="page-title"><Back content={isNew ? "새 캠페인" : "캠페인 수정"}/></h1>
            <SuccessBox>{okMsg}</SuccessBox>
            <WarningBox>{errMsg}</WarningBox>
            <div className="flex flex-column">
                <label>제목 (필수)</label>
                <input type="text" value={title || ''} onChange={e => setTitle(e.target.value)}
                       className="input-form" placeholder="너와 나의 연결고리, U&amp;I"/>
            </div>
            <div className="flex flex-column">
                <label>부제목 (필수)</label>
                <input type="text" value={subTitle || ''} onChange={e => setSubTitle(e.target.value)}
                       className="input-form" placeholder="온에어의 웹드라마 지금 확인!"/>
            </div>
            <div className="flex flex-column">
                <label>이미지</label>
                {prvImageSrc ? <p className="info">전에 업로드한 이미지가 있습니다.</p> : null}
                <button className="button w-100" onClick={() => fileElement.click()}>파일 선택하기 {fileName()}</button>
                <input id="file-input" ref={input => setFileElement(input)} style={{display: "none"}} type="file"
                       name="file" onChange={e => {
                    setFile(e.target.files[0]);
                    reader.readAsDataURL(e.target.files[0])
                }}/>
                <p className="info">10MB 이하. 투명 배경(png)을 권장합니다.</p>
            </div>
            <div className="flex flex-column">
                <label>링크</label>
                <input type="text" value={link || ''} onChange={e => setLink(e.target.value)}
                       className="input-form" placeholder="https://onair.zego.life"/>
                <p className="info">{validURL(link) ? null : "유효한 URL을 입력하세요!"}</p>
            </div>
            <div className="flex flex-column">
                <label>시작 날짜</label>
                <div className="flex justify-between">
                    <input type="date" className="input-form" placeholder="시작 날짜를 입력하세요" value={startDate}
                           onChange={e => setStartDate(e.target.value)} max={endDate}/>
                    <select className="select select-form" value={startHour}
                            onChange={e => setStartHour(e.target.value)}>
                        {[...Array(24).keys()].map(i => <option key={i} value={i}>{i}시</option>)}
                    </select>
                </div>
            </div>
            <div className="flex flex-column">
                <label>종료 날짜</label>
                <div className="flex justify-between">
                    <input type="date" className="input-form" min={startDate} placeholder="종료 날짜를 입력하세요" value={endDate}
                           onChange={e => setEndDate(e.target.value)}/>
                    <select className="select select-form" value={endHour} onChange={e => setEndHour(e.target.value)}>
                        {[...Array(24).keys()].map(i => <option key={i} value={i}>{i}시</option>)}
                    </select>
                </div>
            </div>
            <div className="flex flex-column mt-4">
                <label>미리보기</label>
                <CampaignBox c={{Title: title, SubTitle: subTitle, Link: link, ImageSrc: imagePreview}}/>
            </div>
            <p className="total time">총 <span className="time">{totalDate.day}일 {totalDate.hour}시간</span>, <span
                className="price">₩{totalPrice}</span></p>
            <button className={loading ? "button float-right mt-5 loading" : "button float-right mt-5"}
                    onClick={onClick}>다음
            </button>
        </>
    )
}

export default withRouter(CampaignNew)