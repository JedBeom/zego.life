import React from 'react'

const Page = ({head, children, foot}) => {
    return (
        <>
            {head}
            <div className="page">
                {children}
            </div>
            {foot}
        </>
    )
}

export default Page