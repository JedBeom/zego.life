import htmlDecode from './htmlDecode'

const hangul = ["", "아침", "점심", "저녁"]

const dietMake = (d) => {
    if (d.Content)
        d.dietList = htmlDecode(d.Content).replace(/(\d?\d\.){1,}/g, "").split("\n")
    else
        d.dietList = []
    d.when = hangul[d.Type]
    d.isLoading = false;

    return d
}

export default dietMake