import htmlDecode from './htmlDecode'

const dietMake = (d) => {
    d.year = d.Timestamp.slice(0, 4);
    d.month = d.Timestamp.slice(5, 7);
    d.day = d.Timestamp.slice(8, 10);
    d.dietList = htmlDecode(d.Content).replace(/(\d?\d\.){1,}/, "").split("\n")
    if (d.Type === 1) {
        d.when = "아침"
    } else if (d.Type === 2) {
        d.when = "점심"
    } else if (d.Type === 3) {
        d.when = "저녁"
    }
    d.isLoading = false;

    return d
}

export default dietMake