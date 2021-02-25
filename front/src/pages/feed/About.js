import React from 'react'
import Page from '../../components/Page'

const About = () => {
    return <Page title="담벼락이 무엇인가요?" back>
        <p>담벼락은 제고라이프만의 익명 게시판입니다.</p>
        <p>마치 비어있는 벽에 낙서를 하듯이, 하고 싶은 말을 적어주세요. 남의 글에 덧붙일 수도 있습니다.</p>
        <p className="mt-4">
            덧붙여진 글을 누르면 그 글의 번호가 입력창에 추가됩니다. 이렇게 덧붙여진 글에 답글을 남길 수 있습니다.
        </p>
    </Page>
}

export default About