import React from 'react'

const NoticeCard = ({notice}) => {
    return (
        <article className="card-box shadow-3 notice-box">
            <h2>{notice.Title}</h2>
            <div className="notice-meta">
                <p>📅 {notice.year}년 {notice.month}월 {notice.day}일</p>
                <p>✏️ 개발자</p>
            </div>
            <div dangerouslySetInnerHTML={{__html: notice.ContentHTML}}/>
        </article>
    )
}

export default NoticeCard