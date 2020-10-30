import React from 'react'
import Back from '../../components/Back'

const AddToHome = () => {
    return (
        <>
            <h1 className="page-title"><Back content="홈 화면 추가"/></h1>
            <article className="card-box shadhow-3">
                <h2 className="card-title">iOS의 경우</h2>
                <ol>
                    <li>Safari로 접속합니다.</li>
                    <li>하단의 <img className="icon"
                                 src="https://www.flaticon.com/svg/static/icons/svg/3580/3580382.svg"></img>공유 버튼을 누릅니다.
                    </li>
                    <li>'홈 화면에 추가'를 눌러 추가합니다.</li>
                </ol>
            </article>
            <article className="card-box shadhow-3">
                <h2 className="card-title">안드로이드의 경우</h2>
                <ol>
                    <li>Chrome으로 접속합니다.</li>
                    <li>상단의 메뉴를 누릅니다.</li>
                    <li>'홈 화면에 추가'를 눌러 추가합니다.</li>
                </ol>
            </article>
        </>
    )
}

export default AddToHome