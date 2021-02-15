import React, {useEffect} from 'react'
import styled from 'styled-components'
import Back from './Back'

const Page = ({title, back, head, children, foot, className}) => {
    useEffect(() => {
        if (title) document.title = `${title} | 제고라이프`
    }, [title])

    return (
        <Wrapper className={className}>
            {head}
            {title ?
                <Title>
                    {back ? <Back content={title}/> : title}
                </Title>
                : null}
            <div className="page">
                {children}
            </div>
            {foot}
        </Wrapper>
    )
}

const Wrapper = styled.div`
margin: 2.3rem .75rem;
`

const Title = styled.h1`
margin-left: .25rem;
font-size: 2.3em;
margin-bottom: .75rem;

-webkit-text-stroke-color: var(--page-title-bg-color);
`

export default Page