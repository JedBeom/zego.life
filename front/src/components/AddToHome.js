import {NavLink} from 'react-router-dom'

import CardBox from '../components/ui/CardBox'

const shouldShow = (!window.navigator.standalone && !window.matchMedia('(display-mode: standalone)').matches && /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent))

const AddToHome = () => {
    if (!shouldShow) return null

    return <CardBox>
        <h2 className="card-title">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler" viewBox="0 0 24 24">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"/>
                <line x1="12" y1="12" x2="20" y2="7.5"/>
                <line x1="12" y1="12" x2="12" y2="21"/>
                <line x1="12" y1="12" x2="4" y2="7.5"/>
            </svg>
            홈 화면에 추가하세요.
        </h2>
        <p>제고라이프를 홈화면에 추가해서 앱처럼 사용하세요.</p>
        <NavLink to="/help/add-to-home">
            <button className="button float-right">추가 방법 보기</button>
        </NavLink>
    </CardBox>
}

export default AddToHome