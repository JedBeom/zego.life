const ymd = (date, pad) => {
    let d = {y: 0, m: 0, d: 0, h: 0, min: 0}

    if (date) {
        if (typeof date.getMonth !== 'function') {
            date = new Date(date)
        }

        d = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            min: date.getMinutes()
        }
    }

    if (pad) {
        if (d.m < 10) {
            d.m = "0" + d.m
        }
        if (d.d < 10) {
            d.d = "0" + d.d
        }
    }

    return d
}

export const timestampDot = (date) => {
    const {y, m, d} = ymd(date, true)
    return y + "." + m + "." + d
};

export const timestampHyphen = date => {
    const {y, m, d} = ymd(date, true)
    return y + "-" + m + "-" + d
}

export const timestampHyphenToDot = ts => {
    return ts.slice(0, 4) + "." + ts.slice(5, 7) + "." + ts.slice(8, 10)
}

export const timestampHangul = (date, wantTime) => {
    const {y, m, d, h, min} = ymd(date)
    const front = `${y}년 ${m}월 ${d}일`
    if (!wantTime) {
        return front
    }

    return front + ` ${h}시 ${min}분`
}

export const timestampHangulNoYear = (date, wantTime) => {
    const {m, d, h, min} = ymd(date)
    const front = `${m}월 ${d}일`
    if (!wantTime) {
        return front
    }

    return front + ` ${h}시 ${min}분`
}
