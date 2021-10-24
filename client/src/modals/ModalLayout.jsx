import close from '../assets/imgs/close.svg'

export default function ModalLayout(props) {
  return (
    <div
      className="modal-bg"
      onClick={() => props.updateModal(prevModal => ({
        ...prevModal,
        [props.modal]: false
      }))}
    >
      <section className='modal'>
        <header>
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
        </header>
        {props.children}
      </section>
    </div>
  )
}
