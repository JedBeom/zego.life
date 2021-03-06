const whatMeal = () => {
    let d = new Date()
    let h = d.getHours()
    let m = d.getMinutes()
    h += m / 60

    let what = 0 // breakfast
    if (d.getDay() === 6 || d.getDay() === 0) {
        if (h >= 9 && h <= 13.5) {
            what = 1
        } else if (h > 13.5 && h <= 18.5) {
            what = 2
        }
    } else {
        if (h >= 8.25 && h <= 13.85) {
            what = 1 // lunch
        } else if (h > 13.85 && h <= 19.2) {
            what = 2 // dinner
        }
    }

    return what
};

export default whatMeal