import React from 'react'
import Page from '../../components/Page'

const About = () => {

    return (
        <Page title="팀 제고라이프" back>
            <article className="card-box">
                <h2>범준환: 개발 &amp; 운영</h2>
                <p>기능을 기획하고, 개발하고, 운영합니다.</p>
            </article>
            <article className="card-box">
                <h2>박하연: 디자인 조언</h2>
                <p>디자인 조언을 합니다.</p>
            </article>
            <article className="card-box">
                <h2>윤소리: 운영 보조</h2>
                <p>포스터 제작, 기능 테스트 등을 했습니다.</p>
            </article>
            <article className="card-box">
                <h2>제고라이프에 기여하실래요?</h2>
                <p>Github에서 제고라이프 레포를 찾아보세요.</p>
            </article>
        </Page>
    )
}

export default About