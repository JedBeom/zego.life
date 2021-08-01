import { useEffect, useState } from "react"
import { withRouter } from "react-router"
import {NavLink} from 'react-router-dom'
import { ErrorBox } from "../../components/AlertBox"
import Page from "../../components/Page"
import axios from 'axios'
import styled from "styled-components"

import {isAdmin} from "../../utils/getRoles";

const Notices = ({match}) => {
    const [loading, setLoading] = useState(true)
    const [notice, setNotice] = useState(null)
    const [errMsg, setErrMsg] = useState("")

    const getNotice = async (id) => {
        try {
            const {data} = await axios.get(`notices/${id}`)
            setNotice(data)
        } catch {
            setErrMsg("문제가 발생했습니다.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getNotice(match.params.id)
    }, [match])

    if (loading) {
        return <Page loading title="불러오는 중" back />
    }

    if (errMsg || !notice) {
        return <Page title="공지사항" back>
            <ErrorBox>{errMsg}</ErrorBox>
        </Page>
    }

    return <Page title={notice.Title} back>
        {isAdmin() ?
            <NavLink to="/admin/notice-new">
                <button className="button mb-6">글쓰기</button>
            </NavLink> : null
        }
        <Content dangerouslySetInnerHTML={{__html: notice.ContentHTML}}/>
    </Page>
}

const Content = styled.div`
.notice-meta {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    text-align: center;
}

.notice-meta p {
    display: inline;
}

p {
    margin-bottom: .25rem;
}

h1 {
    margin-left: 0;
}

h2 {
    font-weight: 700;
    padding-left: 0 !important;
    margin: 1rem .1rem .5rem 0;
}

h3 {
    font-weight: 700;
    margin: 1rem .1rem .5rem 0;
}

ul {
    list-style-type: square;
    margin-top: .75em;
    margin-bottom: .75em;
}
`

export default withRouter(Notices)