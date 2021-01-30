import React from 'react'

const links = {
    "onair": "https://onair.zego.life",
    "26hanbit": "calc(env(safe-area-inset-top) + 3em)"
}

const Site = ({match}) => {
    return <>
        <style>
            {`
            .site {
                padding-top: env(safe-area-inset-top);
                padding-left: 0;
                padding-right: 0;
                padding-bottom: 2rem;
            }
            .root-div {
                overflow-y: hidden;
            }
            header {
                visibility: hidden;
            }
            `}
        </style>
        <iframe frameBorder="0" className="fes-site" src={links[match.params.name]}/>
    </>
}

export default Site