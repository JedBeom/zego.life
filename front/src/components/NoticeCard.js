import React from 'react'
import CalendarIcon from '../icons/Calendar'
import PencilIcon from '../icons/Pencil'

const NoticeCard = ({notice, children}) => {
    return (
        <article className="card-box shadow-3 notice-box">
            {notice.Title === "" ?
                null :
                <>
                    <h2>{notice.Title}</h2>
                    <div className="notice-meta">
                        <p><CalendarIcon className="icon"/>{notice.year}년 {notice.month}월 {notice.day}일</p>
                        <p><PencilIcon className="icon"/>{notice.Author}</p>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: notice.ContentHTML}}/>
                    {children}
                </>
            }
        </article>
    )
}

export default NoticeCard