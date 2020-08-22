const timestamp = (date) => {
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

export default timestamp
