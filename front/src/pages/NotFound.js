import {NavLink} from 'react-router-dom'

import Page from '../components/Page'

const NotFound = () => {
    return (
        <Page title="없는 페이지" back>
            <p>링크가 만료되었거나 잘못된 거 같네요. 사용자 님의 실수는 아니니 걱정하실 필요 없어요. 문제가 지속된다면, 피드백 보내주세요.</p>
            <p className="mt-4">심심하시면... <a href="https://youtu.be/0FgA_tn9f6c">치즈</a> 노래 어떤가요?</p>
            <p>아니면<NavLink to="/about">만든 사람들 이야기</NavLink>도 있어요.</p>
        </Page>
    )
}

export default NotFound