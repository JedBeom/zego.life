import {withRouter} from 'react-router-dom'
import styled from 'styled-components'

const arrowText = (content, onClick) => <span onClick={onClick} className="cursor-pointer">
    <Arrow></Arrow>{content}
</span>

const Arrow = styled.span`
margin-right: .1em;
`

const Back = ({history, content}) => arrowText(content, () => history.goBack())

export {arrowText}
export default withRouter(Back)