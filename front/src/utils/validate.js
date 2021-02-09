const validateGCN = (g, c, n) => {
    return !((g < 1 || g > 3)
        || (c < 1 || (g === 1 && c > 8) || (g === 2 && c > 8) || (g === 3 && c > 10))
        || (n < 1 || n > 31));
}

export {validateGCN}