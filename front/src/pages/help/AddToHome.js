import React from 'react'
import Page from '../../components/Page'
import ShareIcon from '../../icons/Share'

const AddToHome = () => {
    return (
        <Page title="홈 화면 추가" back>
            <article className="card-box shadhow-3">
                <h2 className="card-title">iOS의 경우</h2>
                <ol>
                    <li>Safari로 접속합니다.</li>
                    <li>하단의 <ShareIcon/>공유 버튼을 누릅니다.
                    </li>
                    <li>'홈 화면에 추가'를 눌러 추가합니다.</li>
                </ol>
            </article>
            <article className="card-box shadhow-3">
                <h2 className="card-title">안드로이드의 경우</h2>
                <ol>
                    <li>Chrome으로 접속합니다.</li>
                    <li>상단의 메뉴(점 세 개)를 누릅니다.</li>
                    <li>'홈 화면에 추가'를 눌러 추가합니다.</li>
                </ol>
            </article>
        </Page>
    )
}

export default AddToHome