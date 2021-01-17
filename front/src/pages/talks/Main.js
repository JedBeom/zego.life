import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {ErrorBox} from '../../components/AlertBox'

const Main = () => {

    const [threads, setThreads] = useState([])
    const [errMsg, setErrMsg] = useState("")

    const getThreads = async () => {
        try {
            const {data} = await axios.get(`threads`, {
                params: {
                    limit: 50,
                    page: 1,
                }
            })
            if (data.Count === 0) {
                setErrMsg("스레드가 없습니다.")
                return
            }
            setThreads(data.Threads)
        } catch (e) {
            setErrMsg("불러오지 못했습니다.")
        }
    }

    useEffect(() => {
        getThreads()
    }, [])

    return (
        <>
            <h1 className="page-title">TALKS
                <div className="beta-badge inline-block bg-red green-lightest px-2 py-1 br-round m-3">ALPHA</div>
            </h1>
            <NavLink to="/talks/post">
                <button className="button mb-3">새 스레드</button>
            </NavLink>
            <ErrorBox>{errMsg}</ErrorBox>
            <div className="radio-description">
                <p>
                    이 기능은 <strong>실험적</strong>입니다. 언제든지 사라지거나 수정될 수 있습니다.
                </p>
            </div>
            <div className="table-container row-border">
                <table className="table">
                    <thead>
                    <tr>
                        <a>
                            <td>주제</td>
                            <td>코멘트</td>
                        </a>
                    </tr>
                    </thead>
                    <tbody>
                    {threads.map((t, i) => {
                        return (
                            <tr>
                                <NavLink to={`/talks/${t.ID}`}>
                                    <td>{t.Title}</td>
                                    <td>{t.CommentsNum}개</td>
                                </NavLink>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Main