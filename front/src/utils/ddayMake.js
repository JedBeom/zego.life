export default function ddayMake(es, today) {
    let count = 0
    today.setHours(0, 0, 0, 0)
    es.map(e => {
        e.Date = new Date(e.Date)
        e.Date.setHours(0, 0, 0, 0)
        const diff = e.Date - today
        e.Left = -(diff / 1000 / 60 / 60 / 24)
        if (e.Left <= 0) count++
        return e
    })
    return {es, count}
}