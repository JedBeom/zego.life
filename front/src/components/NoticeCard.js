import styled from 'styled-components'

import CardBox from '../components/ui/CardBox'

import CalendarIcon from '../icons/Calendar'
import PencilIcon from '../icons/Pencil'
import {timestampHangul} from '../utils/timestamp'

const NoticeCard = ({notice, children}) => {
    if (!notice.Title) return null

    return (
        <Box>
            <h2>{notice.Title}</h2>
            <div className="notice-meta">
                <p><CalendarIcon className="icon"/>{timestampHangul(notice.CreatedAt)}</p>
                <p><PencilIcon className="icon"/>{notice.Author}</p>
            </div>
            <div dangerouslySetInnerHTML={{__html: notice.ContentHTML}}/>
            {children}
        </Box>
    )
}

const Box = styled(CardBox)`
.notice-meta {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
    text-align: center;
}

.notice-meta p {
    display: inline;
}

p {
    margin-bottom: .25rem;
}

h1 {
    margin-left: 0;
}

h2 {
    font-weight: 700;
    padding-left: 0 !important;
    margin: 1rem .1rem .5rem 0;
}

h3 {
    font-weight: 700;
    margin: 1rem .1rem .5rem 0;
}

ul {
    list-style-type: square;
    margin-top: .75em;
    margin-bottom: .75em;
}
`

export default NoticeCard