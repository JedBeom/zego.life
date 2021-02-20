import React from 'react'

const LockAccess = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`icon icon-tabler ${className}`} viewBox="0 0 24 24">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 8v-2a2 2 0 0 1 2 -2h2"/>
        <path d="M4 16v2a2 2 0 0 0 2 2h2"/>
        <path d="M16 4h2a2 2 0 0 1 2 2v2"/>
        <path d="M16 20h2a2 2 0 0 0 2 -2v-2"/>
        <rect x="8" y="11" width="8" height="5" rx="1"/>
        <path d="M10 11v-2a2 2 0 1 1 4 0v2"/>
    </svg>
)

export default LockAccess