import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

import Page from '../../components/Page'
import {ErrorBox} from '../../components/AlertBox'

import PlusIcon from '../../icons/Plus'


const Main = () => {
    const [cmps, setCmps] = useState([])
    const [cmpsNotActive, setCmpsNotActive] = useState([])
    const [cnps, setCnps] = useState([])

    const [loading, setLoading] = useState(true)
    const [errMsg, setErrMsg] = useState()

    useEffect(() => {
        getCampaigns()
    }, [])

    const getCampaigns = async () => {
        try {
            {
                const {data} = await axios.get(`campaigns/me`, {params: {active: "true"}})
                if (data) {
                    setCmps(data)
                }
            }
            {
                const {data} = await axios.get(`campaigns/me`)
                if (data) {
                    setCmpsNotActive(data)
                }
            }
            {
                const {data} = await axios.get(`campaigns-not-payed/me`)
                if (data) {
                    setCnps(data)
                }
            }
        } catch {
            setErrMsg("로딩 중 문제가 발생했습니다.")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <Page title="캠페인" back>
            <div className="loader"/>
        </Page>
    }

    return <Page title={<NavLink className="no-underline" to="/more"> 캠페인</NavLink>}>
        <div className="flex justify-center w-100 mb-6">
            <NavLink className="no-underline" to="/campaigns/new">
                <button className="button"><PlusIcon/>새 캠페인 만들기</button>
            </NavLink>
        </div>
        <ErrorBox>{errMsg}</ErrorBox>
        <article className="campaigns">
            <h3>진행 중인 캠페인</h3>
            {cmps.map(e => <div key={e.ID} className="quick-look">
                <h4>{e.Title}</h4>
                <p>약 {Math.floor((new Date(e.EndAt) - new Date()) / 1000 / 60 / 60)}시간 남음</p>
            </div>)}
        </article>
        <article className="campaigns">
            <h3>시작 대기 중인 캠페인</h3>
            {cmpsNotActive.map(e => <div key={e.ID} className="quick-look">
                <h4>{e.Title}</h4>
                <p>약 {Math.floor((new Date(e.StartAt) - new Date()) / 1000 / 60 / 60)}시간 후 시작</p>
            </div>)}
        </article>
        <article className="campaigns">
            <h3>승인/결제 대기 중인 캠페인</h3>
            {cnps.map(e => <div key={e.ID} className="quick-look flex justify-between">
                <div>
                    <h4>{e.Title}</h4>
                    {e.PayedAt ? <p className="blue">승인 대기 중</p> : <p className="red">결제 필요</p>}
                </div>
                {!e.PayedAt ?
                    <NavLink className="no-underline" to={`/campaigns/new/${e.ID}`}>
                        <button className="button button-edit">수정 및 결제</button>
                    </NavLink>
                    : null}
            </div>)}
        </article>
        <p className="info">도움이 필요하신가요? 피드백을 남겨주세요.</p>
    </Page>
}

export default Main