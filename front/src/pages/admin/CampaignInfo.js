import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {ErrorBox, SuccessBox} from '../../components/AlertBox'
import '../../styles/campaigns.css'

import UserBox from '../../components/UserBox'
import Page from '../../components/Page'
import Back from '../../components/Back'

const CampaignInfo = ({match}) => {
    const [cnp, setCnp] = useState({})

    const [initalLoading, setInitialLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [okMsg, setOkMsg] = useState()
    const [errMsg, setErrMsg] = useState()

    useEffect(() => {
        getCampaign()
        // eslint-disable-next-line
    }, [])

    const getCampaign = async () => {
        try {
            const {data} = await axios.get(`campaigns-not-payed/${match.params.id}`, {params: {user_include: "true"}})
            if (data) {
                setCnp(data)
            }
        } catch {
            setErrMsg("로딩 중 문제가 발생했습니다.")
        } finally {
            setInitialLoading(false)
        }
    }

    const moveCampaign = async () => {
        setLoading(true)
        try {
            await axios.patch(`campaigns-not-payed/${match.params.id}/move`)
            setOkMsg("성공!")
        } catch (e) {
            setErrMsg(`실패. ${e}`)
        } finally {
            setLoading(false)
        }
    }

    if (initalLoading) {
        return <>
            <h1 className="page-title"><Back content="캠페인 세부정보"/></h1>
            <div className="loader"/>
        </>
    }

    return <Page className="campaigns-site">
        <h1 className="page-title"><Back content="캠페인 세부정보"/></h1>
        <ErrorBox>{errMsg}</ErrorBox>
        <SuccessBox>{okMsg}</SuccessBox>
        <article className="campaign-info">
            <h4>제목: {cnp.Title}</h4>
            <p>부제목: {cnp.SubTitle}</p>
            <p>가격: {cnp.Price}</p>
            <p>시작: {new Date(cnp.StartAt).toISOString()}</p>
            <p>끝: {new Date(cnp.EndAt).toISOString()}</p>
            <p>입금수단: {cnp.Payment}</p>
            <p>입금자명: 제라{cnp.PayCode}</p>
            <p>입금일시: {new Date(cnp.PayedAt).toLocaleDateString()}</p>
            <p className="mt-3 mb-6">사용자</p>
            <UserBox u={cnp.User}/>
        </article>
        <button onClick={moveCampaign} className={`button float-right ${loading ? "loading" : null}`}>승인하기</button>
    </Page>
}

export default CampaignInfo