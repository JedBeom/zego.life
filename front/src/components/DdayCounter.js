import styled from 'styled-components';

const DdayCounter = ({events, count}) => {
    let today = new Date()
    today.setHours(0, 0, 0, 0)

    return <>
        {events.map(e => {
            if (e.Left > 0) return null

            return <DdayItem key={e.Name}>
                <p className="name">{e.Name}</p>
                <p className="days">{e.Left === 0 ? "D-DAY" : `D${e.Left}`}</p>
            </DdayItem>
        })}
    </>
}

const DdayItem = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

margin: 1rem;

.name {
    font-size: 1.1rem;
}

.days {
    font-size: 2rem;
    font-weight: 700;
}
`

export default DdayCounter