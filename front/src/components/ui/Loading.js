import styled, { keyframes } from 'styled-components'

export default function Loading({visible}) {
    if (!visible) {
        return null
    }

    return <Loader/>
}

const load8 = keyframes`
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}
`

const Loader = styled.div`
position: absolute;
top: calc(50% - 4rem);
left: calc(50% - 3.4rem);
width: 6rem;
height: 6rem !important;
border: .5rem solid rgba(var(--loader-color), 0.2);
border-left: .5rem solid rgb(var(--loader-color));
border-radius: 50%;
animation: ${load8} 1.1s infinite linear;
`