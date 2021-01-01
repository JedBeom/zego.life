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
                    귀찮음이 새로움을 만듭니다.
                </p>
            </article>
            <article className="card-box shadow-3">
                <h2>개발 &#38; 운영: 06</h2>
                <p>네? 최적화? 그게 뭐죠?</p>
            </article>
            <article className="card-box shadow-3">
                <h2>디자인 조언: 17</h2>
                <p>디자인 조언을 합니다.</p>
            </article>
            <article className="card-box shadow-3">
                <h2>운영: 19</h2>
                <p>집 가고 싶다</p>
            </article>
        </>
    )
}

export default About