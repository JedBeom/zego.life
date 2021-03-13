import React, {useEffect, useState} from 'react'

import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {ErrorBox} from '../../components/AlertBox'
import '../../styles/campaigns.css'

import Page from '../../components/Page'

const CampaignMove = () => {

    const [cnps, setCnps] = useState([])

    const [loading, setLoading] = useState(true)
    const [errMsg, setErrMsg] = useState()

    useEffect(() => {
        getCampaigns()
        // eslint-disable-next-line
    }, [])

    const getCampaigns = async () => {
        try {
            const {data} = await axios.get(`campaigns-not-payed/payed`)
            if (data) {
                setCnps(data)
            }
        } catch {
            setErrMsg("로딩 중 문제가 발생했습니다.")
        } finally {
            setLoading(false)
        }
    }

    return <Page className="campaigns-site" loading={loading} title="캠페인 승인" back>
        <ErrorBox>{errMsg}</ErrorBox>
        <article className="campaigns">
            <h3>승인 대기 중인 캠페인</h3>
            {cnps.map(e => <div key={e.ID} className="quick-look flex justify-between">
                <div>
                    <h4>{e.Title}</h4>
                    {e.PayedAt ? <p className="blue">승인 대기 중</p> : <p className="red">결제 필요</p>}
                </div>
                <NavLink className="no-underline" to={`/admin/campaign-info/${e.ID}`}>
                    <button className="button button-edit">더보기</button>
                </NavLink>
            </div>)}
        </article>
    </Page>
}

export default CampaignMove