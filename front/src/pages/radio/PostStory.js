import React, {useEffect, useState} from 'react'
import Back from '../../components/Back'
import axios from 'axios';
import {isAdmin, isThat} from '../../utils/getRoles'
import {NavLink} from 'react-router-dom';

const PostStory = () => {
    const [anonymous, setAnonymous] = useState(false)
    const [guest, setGuest] = useState(false)
    const [content, setContent] = useState("")
    const [songRequest, setSongRequest] = useState("")

    const [okMsg, setOkMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const submit = async e => {
        setLoading(true)
        setOkMsg("")
        setErrMsg("")
        e.preventDefault()
        if (content.replace(/\s/g, '') === "") {
            setErrMsg("사연 쓰기가 부끄러운가요? 할 수 있어요!")
            setLoading(false)
            return
        } else if (content.length < 2) {
            setErrMsg("어라... 사연이 너무 짧은걸요?")
            setLoading(false)
            return
        }

        let p = {
            Content: content,
            SongRequest: songRequest,
            Anonymous: anonymous,
            Guest: guest
        }

        try {
            await axios.post(`radio-stories`, p)
            setContent("")
            setSongRequest("")
            setOkMsg("보내주신 사연, 감사히 읽어볼게요. 청춘라디오를 기대하세요!")
        } catch (e) {
            setErrMsg("어라, 사연을 보내지 못했어요. 로그인되어 있는지 확인하세요.")
        }
        setLoading(false)
    }

    useEffect(() => {
        if (localStorage.getItem("token") == null) setErrMsg("로그인 해주세요.")
    }, [])

    return (
        <>
            <h1 className="page-title"><Back content="라디오 사연 보내기"/></h1>
            {isThat("radio") || isAdmin() ?
                <NavLink to="/radio/stories">
                    <button className="button mb-6">사연 보기</button>
                </NavLink> : null
            }
            <div className="radio-description">
                <p>하고 싶었던 말, 여기에 전부 적어주세요.
                    연애고민, 성적고민, 온라인 기간의 이야기, 평소 학교생활, 말하지 못했던 이야기 등등
                    &nbsp;<span className="fw-bold linear-orange bg-no-repeat bg-b bg-100-10 hover-bg-100-100 ease-100">여러분들의 이야기</span>를
                    들려주세요! </p>
                <p>익명 투고 시 익명성이 확실히 보장됩니다!</p>
            </div>
            <form onSubmit={submit}>
                <input type="checkbox" checked={anonymous} className="checkbox" id="anonymous"
                       onChange={e => setAnonymous(e.target.checked)}/>
                <label htmlFor="anonymous">
                    <span>익명을 원해요!</span>
                </label>
                <input type="checkbox" checked={guest} className="checkbox" id="guest"
                       onChange={e => setGuest(e.target.checked)}/>
                <label htmlFor="guest" className="block mt-3">
                    <span>게스트로 출연할 의향이 있어요!</span>
                </label>
                <div className="flex flex-column mt-3">
                    <label className="my-2">사연</label>
                    <textarea className="textarea" rows="5" placeholder="내용" value={content}
                              onChange={e => setContent(e.target.value)}/>
                </div>
                <div className="flex flex-column mt-3">
                    <label className="my-2">신청곡</label>
                    <input type="text" value={songRequest} onChange={e => setSongRequest(e.target.value)}
                           className="input" placeholder="치즈 - 퇴근시간"/>
                </div>
                {okMsg !== "" ?
                    <div className="my-5 bg-green-lightest green px-5 py-3 br-3 border-l bw-6 bc-green">
                        {okMsg}
                    </div> : null}
                {errMsg !== "" ?
                    <div className="my-5 bg-red-lightest red px-5 py-3 br-3 border-l bw-6 bc-red">
                        {errMsg}
                    </div> : null}
                <button className={loading ? "button float-right mt-2 loading" : "button float-right mt-2"}
                        type="submit">보내기!
                </button>
            </form>
        </>
    )
}

export default PostStory