import React from 'react'
import ReactDOM  from 'react-dom';

const MODAL_STYLES={
    backgroundColor:"rgba(34,34,34)",
    position:"fixed",
    top:"50%",
    left:"50%",
    transform:"translate(-50%, -50%)",
    zIndex:1000,
    width:"90%",
    height:"90%",

}
const ORVERLAY_STYLES = {
    position:"fixed",
    top:"0",
    left:"0",
    right:"0",
    bottom:"0",
    backgroundColor:"rgba(0 0 0 .7)",
    zIndex:1000
}

export default function Modal({children ,onClose}) {
  return ReactDOM.createPortal(
    <>
        <div style={ORVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
            <div className='btn btn-danger fs-2' style={{marginLeft:"96%" ,marginTop:"-5px"}} onClick={onClose}>X</div>
            {children}
        </div>
    </>,
    document.getElementById("modal-root")
  )
}
