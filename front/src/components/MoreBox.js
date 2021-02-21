import React from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'

const MoreBoxContainer = styled.div`
column-count: 4;
display: flex;
justify-content: center;
flex-wrap: wrap;
width: 100%;
`

const MoreBox = ({icon, title, to}) => {
    return <NavLink className="no-underline" to={to}><Box>
        <div>
            {icon}
            <h2>{title}</h2>
        </div>
    </Box></NavLink>
}

const Box = styled.div`
display: flex;
align-items: center;
justify-content: center;
font-size: 1rem;
margin: 1.5rem;
text-align: center;

& div {
}

h2 {
    font-size: 1em;
    font-weight: 500;
}

svg {
    margin-left: auto;
    margin-right: auto;
    width: 3em;
    height: 3em;
}
`

export {MoreBoxContainer, MoreBox}