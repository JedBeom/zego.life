export default function dateMake(s) {
    s.map(sl => {
        sl.Date = new Date(sl.Date)
        sl.Date.setHours(0, 0, 0, 0)
    })

    return s
}