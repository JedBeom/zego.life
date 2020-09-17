const isSupported = () => {
    let ua = window.navigator.userAgent;
    let avoidBrowsers = ["NAVER", "KAKAOTALK", "FB"];
    for (let i = 0; i < avoidBrowsers.length; i++) {
        if (ua.includes(avoidBrowsers[i])) {
            return false
        }
    }
    let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (iOS) {
        let iosAvoidBrowsers = ["FxiOS", "Chrome", "Firefox"];
        for (let i = 0; i < iosAvoidBrowsers.length; i++) {
            if (ua.includes(avoidBrowsers[i])) {
                return false
            }
        }
    }

    return true
}

export default isSupported