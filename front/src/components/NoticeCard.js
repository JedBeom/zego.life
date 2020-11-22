import React from 'react'

const NoticeCard = ({notice}) => {
    return (
        <article className="card-box shadow-3 notice-box">
            {notice.Title === "" ?
                null :
                <>
                    <h2>{notice.Title}</h2>
                    <div className="notice-meta">
                        <p>📅 {notice.year}년 {notice.month}월 {notice.day}일</p>
                        <p>✏️ {notice.Author}</p>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: notice.ContentHTML}}/>
                </>
            }
        </article>
    )
}

export default NoticeCard