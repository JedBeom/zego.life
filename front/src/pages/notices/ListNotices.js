import Page from "../../components/Page"

const ListNotices = () => {
    // TODO: list notices later.
    // This component redirects to the latest notice.
    document.location.replace(`/notices/${localStorage.getItem("last_notice")}`)

    return <Page loading />
}


export default ListNotices