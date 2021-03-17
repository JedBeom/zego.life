import React, {useEffect, useState} from 'react'
import axios from 'axios'

import Page from '../../components/Page'
import {ErrorBox, SuccessBox} from '../../components/AlertBox'
import CampaignBox from '../../components/CampaignBox'
import UserBox from '../../components/UserBox'
import {timestampHangul} from '../../utils/timestamp'

import '../../styles/campaigns.css'

const CampaignInfo = ({match}) => {
    const [cnp, setCnp] = useState({})

    const [initialLoading, setInitialLoading] = useState(true)
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
        }
        setInitialLoading(false)
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

    return <Page className="campaigns-site" title="캠페인 세부 정보" back>
        <ErrorBox>{errMsg}</ErrorBox>
        <SuccessBox>{okMsg}</SuccessBox>
        {cnp ?
            <article className="campaign-info">
                <CampaignBox c={cnp}/>
                <p>가격: {cnp.Price}원</p>
                <p>시작: {timestampHangul(cnp.StartAt, true)}</p>
                <p>끝: {timestampHangul(cnp.EndAt, true)}</p>
                <p>입금수단: {cnp.Payment}</p>
                <p>입금자명: 제라{cnp.PayCode}</p>
                <p>입금한 시간: {timestampHangul(cnp.PayedAt, true)}</p>
                <p className="mt-3 mb-6">사용자</p>

                <UserBox u={cnp.User}/>
            </article> : null}
        <button onClick={moveCampaign} className={`button float-right ${loading ? "loading" : null}`}>승인하기</button>
    </Page>
}

export default CampaignInfo