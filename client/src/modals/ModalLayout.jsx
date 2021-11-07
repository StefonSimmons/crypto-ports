import close from '../assets/imgs/close.svg'

export default function ModalLayout(props) {
  return (
    <div className="modal-bg">
      <section className='modal'>
        <section className="modal-header">
          <h1>{`${props.modal === 'edit' ? `${props.modal} asset`: props.modal}`}</h1>
          <img
            src={close}
            alt="close"
            className="close"
            onClick={() => props.updateModal(prevModal => ({
              ...prevModal,
              [props.modal]: false
            }))}
          />
        </section>
        {props.children}
      </section>
    </div>
  )
}
