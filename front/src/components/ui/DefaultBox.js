import styled, {keyframes} from "styled-components";

const fadeIn = keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: var(--card-box-opacity);
}
`

export default styled.article`
margin: 0 .25rem 1rem .25rem;
background-color: var(--card-box-bg-color);
background-image: var(--card-box-bg-image);
color: var(--card-box-text-color);
opacity: var(--card-box-opacity);
animation: ${fadeIn} cubic-bezier(0.075, 0.82, 0.165, 1);
animation-duration: .15s;
`