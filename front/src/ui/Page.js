import styled from "styled-components"

const Page = ({title, children}) => {
    return <Div>
        { title ? <Title>{title}</Title> : null}
        {children}
    </Div>
}

const Div = styled.div`
max-width: 600px;
margin-left: auto;
margin-right: auto;
padding-top: 4em;
`

export const Title = styled.h1`
font-size: 28px;
margin-bottom: .75rem;
font-weight: bold;
`

export default Page