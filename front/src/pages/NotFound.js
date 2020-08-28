import React, {useEffect} from 'react'

const NotFound = () => {
    useEffect(() => {
        document.title = "404 | 제고라이프"
    }, [])

    return (
        <h1>찾을 수 없는 페이지...</h1>
    )
}

export default NotFound