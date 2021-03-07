import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Page from '../../components/Page'
import CardBox from '../../components/ui/CardBox'
import styled from 'styled-components'

const ListStory = () => {
    const [stories, setStories] = useState([])

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

    return <Page title="라디오 사연 보기" back loading={stories.length === 0}>
        {stories.map((e, i) => {
            return <CardBox key={i}>
                <Label>사연</Label>
                <p>{e.Content}</p>
                {e.SongRequest !== "" ? <><Label>신청곡</Label><p>{e.SongRequest}</p></> : null}
                <div className="float-right">
                    <p>{e.Anonymous ? "익명" : `${e.User.Grade}-${e.User.Class} ${e.User.Name}`}</p>
                </div>
            </CardBox>
        })}
    </Page>
}

const Label = styled.label`
font-size: .75rem;
border-radius: 6px;
background-color: #3F33BD;
color: white;
padding: .25em;

`

export default ListStory