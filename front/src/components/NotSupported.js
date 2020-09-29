import React from 'react'
import isSupported from '../utils/isSupported'

const NotSupported = () => {
    if (isSupported()) {
        return null
    }

    return (
        <div className={"mb-5 bg-red-lightest red px-5 py-3 br-3 border-l bw-6 bc-red"}>
            미지원 브라우저입니다. 오류가 발생할 수 있습니다. Safari 또는 Chrome에서 접속해주세요.
        </div>
    )
}

export default NotSupported