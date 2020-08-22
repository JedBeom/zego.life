import React from 'react'

const loadingCard = () => {
    return (
        <article className={"card-box shadow-3 flex justify-around in-progress cursor-progress"}>
            <div className={"spinner bw-6 black"}/>
            <h2 className={"black font-s-core loading-text"}>잠시만요, 불러오고 있어요...</h2>
        </article>
    )
};

export default loadingCard