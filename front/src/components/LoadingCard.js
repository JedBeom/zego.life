const loadingCard = () => {
    return (
        <article className={"card-box flex justify-around in-progress cursor-progress"}>
            <div className={"spinner bw-6"}/>
            <h2 className={"font-s-core loading-text"}>잠시만요, 불러오고 있어요...</h2>
        </article>
    )
};

export default loadingCard