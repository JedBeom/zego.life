import React, {useEffect, useState} from 'react'
import axios from 'axios'

const ListStory = () => {
    const [stories, setStories] = useState([{Content: "불러오는 중"}])

    useEffect(() => {
        const getStories = async () => {
            try {
                const {data} = await axios.get(`radio-stories`)
                if (data == null) setStories([{Content: "사연 없음"}])
                else setStories(data)
            } catch {
                alert("로딩 실패")
            }
        }

        getStories()
    }, [])

    if (stories[0].SongRequest === undefined) {
        return <p>{stories[0].Content}</p>
    }

    return (
        <>
            <h1 className="page-title">라디오 사연 보기</h1>
            {stories.map((e, i) => {
                return <article key={i} className="card-box radio-story shadow-3">
                    <label>사연</label>
                    <p>{e.Content}</p>
                    {e.SongRequest !== "" ? <><label>신청곡</label><p>{e.SongRequest}</p></> : null}
                    <div className="float-right">
                        <p>{e.Anonymous ? "익명" : `${e.User.Grade}-${e.User.Class} ${e.User.Name}`}</p>
                    </div>
                </article>
            })}
        </>
    )
}

export default ListStory