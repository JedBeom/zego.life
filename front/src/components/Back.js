import React from 'react'
import {withRouter} from 'react-router-dom'

const Back = ({history, content}) => {
    return (
        <span className="cursor-pointer" onClick={() => history.goBack()}>
             {content}
        </span>
    )
}

export default withRouter(Back)