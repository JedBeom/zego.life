import { withRouter } from "react-router-dom"
import Page from "../../components/Page"

const ListNotices = ({history}) => {
    // TODO: list notices later.
    // This component redirects to the latest notice.
    history.replace(`/notices/${localStorage.getItem("last_notice")}`)

    return <Page loading />
}


export default withRouter(ListNotices)