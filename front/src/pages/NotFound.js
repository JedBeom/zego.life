import React, {useEffect} from 'react'

const NotFound = () => {
    useEffect(() => {
        document.title = "404 | 제고라이프"
    }, [])

    return (
        <h1>곧 준비될 거예요. 아마도요.</h1>
    )
}

export default NotFound