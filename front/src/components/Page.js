import React, {useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import Back from './Back'

const Page = ({title, back, backTo, head, children, foot, className, noScroll, loading}) => {
    useEffect(() => {
        if (title) document.title = `${title} | 제고라이프`
        if (!noScroll) document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [title])

    return (
        <Wrapper className={className}>
            {head}
            {title ?
                <Title>
                    {backTo ? <NavLink className="no-underline" to={backTo}> {title}</NavLink> :
                        (back ? <Back content={title}/> : title)}
                </Title>
                : null}
            {!loading ?
                <div className="page">
                    {children}
                </div> : <div className="loader"/>}
            {foot}
        </Wrapper>
    )
}

const Wrapper = styled.div`
margin: 2.3rem .5rem;
`

const Title = styled.h1`
margin-left: .25rem;
font-size: 2.3em;
margin-bottom: .75rem;

-webkit-text-stroke-color: var(--page-title-bg-color);
`

export default Page