import React from 'react'
import {withRouter} from 'react-router-dom'

const Back = ({history, content}) => {
    return (
        <span onClick={() => history.goBack()}>
             {content}
        </span>
    )
}

export default withRouter(Back)