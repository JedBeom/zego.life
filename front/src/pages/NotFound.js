import React, {useEffect} from 'react'
import {NavLink} from 'react-router-dom'

const NotFound = () => {
    useEffect(() => {
        document.title = "404 | 제고라이프"
        document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [])

    return (
        <>
            <h1 className="page-title">없는 페이지예요.</h1>
            <p>심심하시면... <a href="https://youtu.be/ysjHqwLKARs">술탄 오브 더 디스코</a> 노래 어떤가요?</p>
            <p>아니면 <NavLink to="/about">만든 사람들 이야기</NavLink>도 있어요.</p>
        </>
    )
}

export default NotFound