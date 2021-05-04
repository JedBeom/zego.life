import React from 'react'
import styled, { keyframes } from "styled-components"
import Icon from './Icon'

const Heart = ({className}) => (
    <Icon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className}>
            <path
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
        </svg>
    </Icon>
)

const heartbeat = keyframes`
0%, 100% {
    transform: scale(1);
}
10%, 30% {
    transform: scale(.9);
}
20%, 40%, 50%, 60%, 70%, 80% {
    transform: scale(1.1);
}
`

const BeatingHeart = styled(Heart)`
animation: ${heartbeat} 1.33s ease-in-out infinite;
fill: #f06292 !important;
width: 1em;

`

export default BeatingHeart