const hakbunToGCN = (hakbun) => {
    let g = Number(hakbun.slice(0, 1))
    let c = Number(hakbun.slice(1, 3))
    let n = Number(hakbun.slice(3, 5))

    return {g, c, n}
}

export default hakbunToGCN