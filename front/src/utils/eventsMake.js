let className = "inline-block px-2 fs-s2 br-round ml-2 "

const eventMake = event => {
    event.date = new Date(event.Date)
    event.year = event.date.getFullYear()

    let badges = []
    if (event.Grade1) {
        badges.push(<div key="grade1" className={className + "bg-yellow yellow-darkest"}>1학년</div>)
    }
    if (event.Grade2) {
        badges.push(<div key="grade2" className={className + "bg-blue blue-lightest"}>2학년</div>)
    }
    if (event.Grade3) {
        badges.push(<div key="grade3" className={className + "bg-pink pink-darkest"}>3학년</div>)
    }

    event.badges = <>
        {badges.map((b) => {
            return b
        })}
    </>

    return event
}

const eventsMake = async data => {
    let events = {}
    let lastKey = ""

    if (data === null) {
        return null
    }

    // await Promise.all(
    data.map((e) => {
        if (lastKey === e.DateString) {
            events[lastKey].push(eventMake(e))
        } else {
            events[e.DateString] = [eventMake(e)]
        }
        lastKey = e.DateString
        return null
    })
    // )
    events.keys = Object.keys(events)

    return events
}

export {eventMake, eventsMake}
