import React from 'react'

const links = {
    "onair": "https://onair.zego.life",
    "26hanbit": "https://26onlinehanbit.imweb.me/",
}

const Site = ({match}) => {
    return <>
        <style>
            {`
            .site {
                padding-top: env(safe-area-inset-top);
                padding-left: 0;
                padding-right: 0;
                max-width: unset;
            }
            .root-div {
                overflow-y: hidden;
            }
            header {
                visibility: hidden;
            }
            `}
        </style>
        <div className="loader"/>
        <iframe frameBorder="0" className="fes-site" src={links[match.params.name]}/>
    </>
}

export default Site