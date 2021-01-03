import React, {useEffect} from 'react'
import Back from '../../components/Back'

const About = () => {
    useEffect(() => {
        document.title = "About | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [])

    return (
        <>
            <h1 className="page-title"><Back content="제작자"/></h1>
            <article className="card-box shadow-3">
                <h2>
                    06+17+19
                </h2>
                <p>
                    제고라이프 만드는 사람들이에요...
                </p>
            </article>
            <article className="card-box shadow-3">
                <h2>개발 &#38; 운영: 06</h2>
                <p>세특 쓰기 싫다...</p>
            </article>
            <article className="card-box shadow-3">
                <h2>디자인 조언: 17</h2>
                <p>디자인 조언을 합니다.</p>
            </article>
            <article className="card-box shadow-3">
                <h2>운영: 19</h2>
                <p>집 가고 싶다...</p>
            </article>
            <article className="card-box shadow-3">
                <h2>제고라이프에 기여하실래요?</h2>
                <p>Github에서 제고라이프 레포를 찾아보세요.</p>
            </article>
        </>
    )
}

export default About