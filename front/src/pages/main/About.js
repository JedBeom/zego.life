import Page from '../../components/Page'
import CardBox from '../../components/ui/CardBox'

const About = () => {

    return (
        <Page title="팀 제고라이프" back>
            <CardBox>
                <h2>범준환: 개발 &amp; 운영</h2>
                <p>기능을 기획하고, 개발하고, 운영합니다.</p>
            </CardBox>
            <CardBox>
                <h2>박하연: 디자인 조언</h2>
                <p>디자인 조언을 합니다.</p>
            </CardBox>
            <CardBox>
                <h2>윤소리: 운영</h2>
                <p>기능 테스트, 정보 정제 등을 합니다.</p>
            </CardBox>
            <CardBox>
                <h2>제고라이프 개발에 참여하세요.</h2>
                <p>Github에서 제고라이프 레포를 찾아보세요.</p>
            </CardBox>
        </Page>
    )
}

export default About