import styled from 'styled-components'
import CardBox from './ui/CardBox'

import {timestampHangul} from '../utils/timestamp'

export default ({f, setAnswer}) => {

    if (!setAnswer) {
        return <Box key={f.ID}>
            <p>{f.Content}</p>
            {f.Answer ? <p className="answer">답변: {f.Answer}</p> : null}
        </Box>
    }

    return <Box onClick={() => setAnswer(f)} key={f.ID}>
        <p>{f.Content} <span
            className="by">— {f.User.Grade}-{f.User.Class} {f.User.Name}({timestampHangul(f.CreatedAt, true)})</span>
        </p>
        {f.Answer ? <p className="answer">답변: {f.Answer}</p> : null}
    </Box>
}

const Box = styled(CardBox)`
.answer {
    margin-top: .25rem;
    padding: .25rem;
    font-style: italic;
    border-top-color: var(--card-box-text-color);
    border-top-width: .1em;
    border-top-style: dotted;
}

.by {
    opacity: 0.8;
}

`

