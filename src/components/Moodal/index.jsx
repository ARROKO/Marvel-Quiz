// eslint-disable-next-line react/prop-types
const Modal = ({showModal, children}) => {
  return (
    showModal && (
      <div className='modalBackground'>
      <div className="modalContainer">
        {children}
      </div>
    </div>
    )
  )
}

export default Modal