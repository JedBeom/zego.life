import React from 'react'
import isSupported from '../utils/isSupported'
import {WarningBox} from '../components/AlertBox'

const NotSupported = () => {
    if (isSupported()) {
        return null
    }

    return (
        <WarningBox>미지원 브라우저입니다. iOS는 Safari, 안드로이드는 Chrome에서 접속해주세요.</WarningBox>
    )
}

export default NotSupported