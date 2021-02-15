const validateGCN = (g, c, n) => {
    return !((g < 1 || g > 3)
        || (c < 1 || (g === 1 && c > 8) || (g === 2 && c > 8) || (g === 3 && c > 10))
        || (n < 1 || n > 31));
}

function validURL(str) {
    if (!str) {
        return true
    }

    // if internal link
    if (str[0] === "/") {
        return true
    }

    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

export {validateGCN, validURL}