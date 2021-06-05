import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import Page from '../../components/Page'
import {ErrorBox, WarningBox} from '../../components/AlertBox'
import Loading from '../../components/ui/Loading'

const payments = [
    {
        code: "toss",
        child: <img alt="토스" src="https://static.toss.im/tds/icon/svg/logo.svg"/>,
        name: "토스로",
    },
    {
        code: "kakaopay",
        child: <svg viewBox="0 0 150 60">
            <defs>
                <path d="M0 0h150v62.5H0z"></path>
            </defs>
            <g fill="none" fillRule="evenodd">
                <g>
                    <path fill="#FFEB00"
                          d="M118.75 62.5h-87.5C13.99 62.5 0 48.509 0 31.25S13.991 0 31.25 0h87.5C136.01 0 150 13.991 150 31.25S136.01 62.5 118.75 62.5"></path>
                </g>
                <path fill="#000"
                      d="M35.802 15c-9.03 0-16.35 5.784-16.35 12.917 0 4.28 2.642 8.07 6.703 10.42l-1.925 7.189c-.184.69.586 1.238 1.177.84l8.35-5.638c.671.067 1.352.105 2.045.105 9.03 0 16.35-5.783 16.35-12.916S44.832 15 35.802 15m30.832 6.18v14.129c.347.044 1.21.13 2.031.13 4.493 0 6.223-3.154 6.223-8.123 0-4.364-1.168-7-4.754-7-1.167 0-2.463.344-3.5.864m0 18.536v8.79h-6.307V15.908h4.45l.777 2.074c1.34-1.34 3.37-2.765 6.655-2.765 6.18 0 9.116 4.623 9.074 12.099 0 7.82-4.537 12.833-11.02 12.833-1.252 0-2.201-.088-3.629-.433m30.981-6.28v-4.32H94.72c-3.241 0-4.884 1.167-4.884 3.5 0 1.77.908 2.636 2.766 2.636 1.728 0 3.932-.866 5.013-1.816m-3.588-8.34h3.588v-.776c0-2.594-1.47-3.804-4.02-3.804-1.943 0-4.45.563-6.48 1.557l-1.729-4.235c2.248-1.555 5.704-2.636 8.77-2.636 6.051 0 9.336 3.197 9.336 9.29v14.995H99.04l-.649-1.989c-2.548 1.858-4.881 2.636-7 2.636-4.622 0-7.215-2.765-7.215-7.432 0-4.97 3.458-7.605 9.851-7.605m28.285 12.373c-2.204 5.877-4.84 10.153-8.686 12.53l-3.886-3.587c2.245-1.944 3.844-3.845 5.226-6.394l-8.382-22.858 6.266-1.685 5.357 18.537 5.315-18.624 6.18 1.73-7.39 20.35z"></path>
            </g>
        </svg>,
        name: "카카오페이로",
    },
    {
        code: "bank",
        child: <p>계좌 이체</p>,
        name: "계좌 이체로",
    }
]

const Payment = ({match, history}) => {
    const [selection, setSelection] = useState(0)
    const [title, setTitle] = useState("")
    const [errMsg, setErrMsg] = useState()
    const [warningMsg, setWarningMsg] = useState()
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(() => {
        getCampaign()
        // eslint-disable-next-line
    }, [])

    const getCampaign = async () => {
        setInitialLoading(true)
        try {
            const {data} = await axios.get(`campaigns-not-payed/${match.params.id}`)
            setTitle(data.Title)
            if ((new Date(data.StartAt) - new Date()) / 1000 / 60 / 60 <= 12) {
                setWarningMsg("시작 시간이 지났거나 얼마 안 남았습니다. 관리자의 승인이 늦어져 게시가 지연될 수 있음을 알아두세요.")
            }

        } catch (e) {
            setErrMsg("로딩에 실패했어요.")
        } finally {
            setInitialLoading(false)
        }
    }

    const setPayment = async () => {
        setLoading(true)
        try {
            const {data} = await axios.patch(`campaigns/${match.params.id}/payment`, {Payment: selection})
            history.push(`/campaigns/${data.ID}/pay`)
        } catch (e) {
            setErrMsg("결제 수단 설정 중 오류가 발생했습니다.")
            setLoading(false)
        }
    }

    if (initialLoading) {
        return <Loading visible={true}/>
    }

    return <Page backTo={`/campaigns/new/${match.params.id}`} title="결제 수단">
        <ErrorBox>{errMsg}</ErrorBox>
        <p className="page-sub">'{title}'<br/>를 결제할 수단을 선택하세요</p>

        <WarningBox>{warningMsg}</WarningBox>

        <div className="flex flex-column">
            <label>결제 수단</label>
            {payments.map((e, i) => <div key={i}
                                         className={`payment-box ${e.code} flex items-center justify-between ${selection === i ? "payment-box-select" : null}`}
                                         onClick={() => setSelection(i)}>
                {e.child}
                {selection === i ? <p className="chosen">선택됨</p> : null}
            </div>)}
        </div>

        <p className="info">{payments[selection].name} 결제합니다</p>
        <button onClick={setPayment} className={`button float-right ${loading ? "loading" : null}`}>다음</button>
    </Page>
}

export default withRouter(Payment)