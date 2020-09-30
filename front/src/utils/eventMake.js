import React, {Fragment} from 'react'

let className = "inline-block px-2 fs-s2 br-round ml-2 "

const eventMake = event => {
    event.date = new Date(event.Date)
    event.year = event.date.getFullYear()

    let badges = []
    if (event.Grade1) {
        badges.push(<div className={className + "bg-yellow yellow-darkest"}>1학년</div>)
    }
    if (event.Grade2) {
        badges.push(<div className={className + "bg-blue blue-lightest"}>2학년</div>)
    }
    if (event.Grade3) {
        badges.push(<div className={className + "bg-pink pink-darkest"}>3학년</div>)
    }

    event.badges = <Fragment>
        {badges.map((b) => {
            return b
        })}
    </Fragment>

    return event
}

export default eventMake