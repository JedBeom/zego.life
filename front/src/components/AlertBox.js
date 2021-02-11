import React from 'react'
import CircleCheckIcon from '../icons/CircleCheck'
import AlertTriangleIcon from '../icons/AlertTriangle'
import AlertOctagonIcon from '../icons/AlertOctagon'

const AlertBox = ({level, icon, children}) => {
    if (!children) {
        return null
    }

    return (
        <div className={`alert-box alert-box-${level}`}>
            {icon}
            {children}
        </div>
    )
}

const SuccessBox = ({children}) => <AlertBox level="success" icon={<CircleCheckIcon/>} children={children}/>
const InfoBox = ({children}) => <AlertBox level="info" icon={<CircleCheckIcon/>} children={children}/>
const WarningBox = ({children}) => <AlertBox level="warning" icon={<AlertTriangleIcon/>} children={children}/>
const ErrorBox = ({children}) => <AlertBox level="error" icon={<AlertOctagonIcon/>} children={children}/>

export {SuccessBox, InfoBox, WarningBox, ErrorBox}