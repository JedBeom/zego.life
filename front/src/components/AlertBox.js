import React from 'react'
import CircleCheckIcon from '../icons/CircleCheck'
import AlertTriangleIcon from '../icons/AlertTriangle'
import AlertOctagonIcon from '../icons/AlertOctagon'

const AlertBox = ({level, icon, content}) => {
    if (content === null || content === "") {
        return null
    }

    return (
        <div className={`alert-box alert-box-${level}`}>
            {icon}
            {content}
        </div>
    )
}

const SuccessBox = ({content}) => <AlertBox level="success" icon={<CircleCheckIcon/>} content={content}/>
const InfoBox = ({content}) => <AlertBox level="info" icon={<CircleCheckIcon/>} content={content}/>
const WarningBox = ({content}) => <AlertBox level="warning" icon={<AlertTriangleIcon/>} content={content}/>
const ErrorBox = ({content}) => <AlertBox level="error" icon={<AlertOctagonIcon/>} content={content}/>

export {SuccessBox, InfoBox, WarningBox, ErrorBox}