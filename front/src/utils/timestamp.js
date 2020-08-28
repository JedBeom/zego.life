const timestampDot = (date) => {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    if (m < 10) {
        m = "0" + m
    }
    if (d < 10) {
        d = "0" + d
    }

    return y + "." + m + "." + d
};

const timestampHyphen = date => {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    if (m < 10) {
        m = "0" + m
    }
    if (d < 10) {
        d = "0" + d
    }

    return y + "-" + m + "-" + d
}

const timestampHyphenToDot = ts => {
    return ts.slice(0, 4) + "." + ts.slice(5, 7) + "." + ts.slice(8, 10)
}

export {timestampDot, timestampHyphen, timestampHyphenToDot}
