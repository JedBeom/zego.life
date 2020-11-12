import React, {useEffect} from 'react'
import Back from '../components/Back'

const About = () => {
    useEffect(() => {
        document.title = "About | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [])

    return (
        <>
            <h1 className="page-title"><Back content="제작자"/></h1>
            <article className="card-box shadow-3">
                <h2 className="card-title">
                    06+17+19
                </h2>
                <p>
                    2020년 여름방학 전, 세특 쓰는 기간에 쓰라는 세특은 안 쓰고 몰래 개발을 했습니다.
                    개발을 하다가 보니 관심을 가지는 친구들이 생겼고, 그렇게 팀이 결성되었습니다.
                </p>
                <p>
                    2020년 8월 10일 컨셉트 디자인을 해서 2020년 9월 테스트 서버를 열어 클로즈드 베타 테스트를 시행했습니다.
                    그리고 2020년 10월, 정식 서버를 열어 OBT(Open Beta Test)를 시작했습니다.
                    2020년 11월 정식 출시를 위해 열심히 개발하고 있습니다.
                </p>
            </article>
            <article className="card-box shadow-3">
                <h2 className="card-title font-s-core">개발: 06</h2>
                <p>제고라이프를 만듭니다.</p>
            </article>
            <article className="card-box shadow-3">
                <h2 className="card-title font-s-core">디자인 조언: 17</h2>
                <p>디자인 조언을 합니다.</p>
            </article>
            <article className="card-box shadow-3">
                <h2 className="card-title font-s-core">올라운더: 19</h2>
                <p>개발과 디자인 외의 다른 일을 도맡아합니다.</p>
            </article>
        </>
    )
}

export default About