import React, {useState} from "react";
import Page from '../../components/Page'

const TokenExpired = () => {
    const [loading, setLoading] = useState(false)

    const logout = async () => {
        setLoading(true)
        sessionStorage.clear()
        localStorage.clear()
        window.location = "/login"
    }
    return (
        <Page title="로그인 만료">
            <p>로그인 토큰이 만료되었습니다. 재로그인 해주십시오.</p>
            <style>nav {'{opacity: 0}'}</style>
            <button className={loading ? "button float-right loading" : "button float-right"} onClick={logout}>로그아웃
            </button>
        </Page>
    )
}

export default TokenExpired