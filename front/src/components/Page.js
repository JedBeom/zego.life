import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import Back, {arrowText} from './Back'

const Page = ({title, hideTitle, back, backTo, head, children, foot, className, noScroll, loading}) => {
    const [displayHead, setDisplayHead] = useState(false)

    useEffect(() => {
        if (title) document.title = `${title} | 제고라이프`
        if (!noScroll) document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
    }, [title])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    }, [])

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setDisplayHead(true)
        } else {
            setDisplayHead(false)
        }
    }

    return <>
        <Header display={displayHead}>
            {title}
        </Header>
        <Wrapper className={className}>
            {head}
            {title && !hideTitle ?
                <Title>
                    {backTo ? <NavLink className="no-underline" to={backTo}>{arrowText(title)}</NavLink> :
                        (back ? <Back content={title}/> : title)}
                </Title>
                : null}
            {!loading ?
                <div className="page">
                    {children}
                </div> : <div className="loader"/>}
            {foot}
        </Wrapper>
    </>
}

const Header = styled.header`
text-align: center;
display: flex;
align-items: center;
justify-content: center;
position: fixed;
width: 100vw;
top: 0;
left: 0;
padding: .75rem;
padding-top: calc(env(safe-area-inset-top) + .75rem);

font-weight: 700;
font-size: 1.2rem;

visibility: ${props => (props.display ? "visible" : "hidden")};
opacity: ${props => (props.display ? "1" : "0")};
transition: opacity .3s;
transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
color: var(--site-logo-color);
`

const Wrapper = styled.div`
margin: 0rem .5rem;
`

export const Title = styled.h1`
margin-left: .25rem;
font-size: 2.3em;
margin-bottom: .75rem;

-webkit-text-stroke-color: var(--page-title-bg-color);
`

export default Page