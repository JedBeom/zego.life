import htmlDecode from './htmlDecode'

const hangul = ["", "아침", "점심", "저녁"]

const dietMake = (d) => {
    d.dietList = htmlDecode(d.Content).replace(/(\d?\d\.){1,}/g, "").split("\n")
    d.when = hangul[d.Type]
    d.isLoading = false;

    return d
}

export default dietMake