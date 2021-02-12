import React from 'react'

const Page = ({head, children, foot, className}) => {
    return (
        <div className={className}>
            {head}
            <div className="page">
                {children}
            </div>
            {foot}
        </div>
    )
}

export default Page