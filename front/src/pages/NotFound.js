import React, {useEffect} from 'react'

const NotFound = () => {
    useEffect(() => {
        document.title = "404 | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [])

    return (
        <>
            <h1 className="page-title">없는 페이지예요.</h1>
            <p>심심하시면... <a href="https://youtu.be/ysjHqwLKARs">술탄 오브 더 디스코</a> 노래 어떤가요?</p>
            <p>아니면 <a href="/about">만든 사람들 이야기</a>도 있어요.</p>
        </>
    )
}

export default NotFound