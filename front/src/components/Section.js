import styled from "styled-components"

export const Section = styled.article`
padding-top: 1rem;
padding-bottom: .5rem;
border-top-color: var(--site-text-color);
border-top-width: .1rem;
border-top-style: solid;
-webkit-font-smoothing: antialiased;
`

export const Item = styled.div`
margin-bottom: 1em;
`

export const ItemTitle = styled.h4`
font-weight: 500;
font-size: 1rem;
margin-bottom: .25rem;
`

export const ItemDescription = styled.p`
color: var(--site-sub-text-color);
font-weight: 700;
font-size: .8rem;
margin-bottom: 1rem;
`