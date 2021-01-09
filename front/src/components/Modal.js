import React from 'react'

const Modal = ({className, visible, children}) => {
    if (visible) {
        visible = " block"
    } else {
        visible = " hidden"
    }
    return (
        <>
            <div className={"modal-overlay" + visible}>
                <div className={"modal-wrapper " + className + visible} tabIndex="-1">
                    <div className="modal-inner" tabIndex="0">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal