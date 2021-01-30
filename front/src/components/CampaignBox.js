import React from 'react'
import {NavLink} from "react-router-dom"

const CampaignBox = ({c}) => {
    let ar = <article className="campaign-box shadow-3">
        <span className="campaign-icon">AD</span>
        <h2>{c.Title}</h2>
        <p>{c.SubTitle}</p>
        {c.ImageSrc ?
            <img alt={c.Title} src={c.ImageSrc}/>
            : null}
    </article>


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

export default CampaignBox