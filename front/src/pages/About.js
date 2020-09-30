import React, {Fragment, useEffect} from 'react'

const About = () => {
    useEffect(() => {
        document.title = "About | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [])

    return (
        <Fragment>
            <h1 className="page-title">제작자</h1>
            <article className="card-box shadow-3">
                <h2 className="card-title font-s-core">
                    06+17+19
                </h2>
                <p>
                    어느 날, 06은 제철고에 관련된 사이트를 만들고 싶었습니다.
                    방학 전 과목별 세특 쓰는 시간에 쓰라는 세특은 안 쓰고 사이트 디자인을 했습니다.
                    06은 전에도 여러 차례 사이트 디자인을 해봤지만, 자기 자신이 디자인을 못한다는 사실을 알고 있었습니다.
                </p>
                <p>
                    그래서 06은 주위 자리에 앉은 친구들에게 디자인에 대한 조언을 받기로 했습니다.
                    글꼴부터 글자 크기, 색까지... 물어보다 보니 고정적으로(?) 조언을 주는 친구들이 있었고 그게 17과 19입니다.
                </p>
                <p>
                    그렇게 팀이 급조되었습니다. 팀은 급조지만, 사이트는 급조가 아닙니다.
                    저희는 언제나 제고라이프의 발전을 위해 고민하고 있습니다.
                </p>
            </article>
            <article className="card-box shadow-3">
                <h2 className="card-title font-s-core">개발: 06</h2>
                <p>처음 사이트를 구상했습니다. 개발하고, 운영합니다.</p>
            </article>
            <article className="card-box shadow-3">
                <h2 className="card-title font-s-core">디자인 조언: 17</h2>
                <p>디자인 조언을 합니다.</p>
            </article>
            <article className="card-box shadow-3">
                <h2 className="card-title font-s-core">테스트: 19</h2>
                <p>테스트하고, 피드백합니다.</p>
            </article>
        </Fragment>
    )
}

export default About