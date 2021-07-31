import { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom'
import styled from 'styled-components'
import Back, {arrowText} from './Back'
import Loading from './ui/Loading'

const Page = ({title, hideTitle, back, backTo, head, children, foot, className, noScrollToTop, loading}) => {
    const [scrollDowned, setScrollDowned] = useState(false)

    useEffect(() => {
        if (title) document.title = `${title} | 제고라이프`
    }, [title])

    useEffect(() => {
        if (!noScrollToTop) document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
        setTimeout(() => window.addEventListener("scroll", handleScroll), 200)
        
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [noScrollToTop])

    const handleScroll = () => {
        setScrollDowned(window.scrollY > 30)
    }

    return <>
        <Header displayHead={scrollDowned}>
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
            <div className="page">
                {children}
            </div>
            <Loading visible={loading}/>
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

pointer-events: none;
opacity: ${props => (props.displayHead ? "1" : "0")};
transition: opacity .25s;
transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
color: var(--site-logo-color);

box-shadow: 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`

const Wrapper = styled.div`
margin-left: auto;
margin-right: auto;
max-width: 900px;
padding: .5rem;
`

export const Title = styled.h1`
margin-left: .25rem;
font-size: 2.3em;
margin-bottom: .75rem;

-webkit-text-stroke-color: var(--page-title-bg-color);
`

export default Page