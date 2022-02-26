export default function ModalLayout(props) {
  return (
    <div className="modal-bg">
      <section className='modal'>
        <section className="modal-header">
          <h1>{`${props.modal === 'edit' ? `${props.modal} asset` : props.modal}`}</h1>
          <span class="material-icons close" onClick={() => {
              props.updateModal(prevModal => ({
                ...prevModal,
                [props.modal.replaceAll(" ", "")]: false
              }))
            }}>
            close
          </span>
        </section>
        {props.children}
      </section>
    </div>
  )
}
