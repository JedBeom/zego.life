import React from 'react'

const Modal = ({className, visible, children}) => {
    return (
        <>
            <div className={"modal-overlay " + (visible ? "block" : "hidden")}>
                <div className={`modal-wrapper ${className} ${visible ? "block" : "hidden"}`} tabIndex="-1">
                    <div className="modal-inner" tabIndex="0">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal