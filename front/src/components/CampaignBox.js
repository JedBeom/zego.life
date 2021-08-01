import {NavLink} from "react-router-dom"
import styled from 'styled-components'
import DefaultBox from './ui/DefaultBox'

const CampaignBox = ({c}) => {
    if (!c) return null

    let ar = <Article>
        <span>IN-AD</span>
        <h2>{c.Title}</h2>
        <p>{c.SubTitle}</p>
        {c.ImageSrc ?
            <img alt={c.Title} src={c.ImageSrc}/>
            : null}
    </Article>


    if (c.Link && c.Link[0] === "/") {
        return (
            <NavLink to={c.Link}>
                {ar}
            </NavLink>
        )
    }

    if (c.Link) {
        return <a rel="noopener noreferrer" target="_blank" href={c.Link}>
            {ar}
        </a>
    }

    return ar
}

const Article = styled(DefaultBox)`
padding: 1em;
border-radius: 8px;
position: relative;
word-break: keep-all;

& a {
    text-decoration: none !important;
}

& h2 {
    z-index: 1;
    font-size: 1rem;
}

& p {
    z-index: 1;
    font-size: .75rem;
}

& span {
    color: var(--site-text-color);
    background-color: var(--background-color);
    padding: .25rem;
    border-radius: 6px;
    font-size: 10px;
    font-weight: bold;
    position: absolute;
    right: 0;
    top: 0;
}

& img {
    opacity: .85;
    position: absolute;
    height: 3rem;
    right: 1rem;
    top: 1rem;
}
`

export default CampaignBox