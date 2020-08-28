import htmlDecode from './htmlDecode'

const dietMake = (d) => {
    d.year = d.Timestamp.slice(0, 4);
    d.month = d.Timestamp.slice(5, 7);
    d.day = d.Timestamp.slice(8, 10);
    d.dietList = d.Content.split("\n");
    for (let i = 0; i < d.dietList.length; i++) {
        d.dietList[i] = htmlDecode(d.dietList[i])
    }
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