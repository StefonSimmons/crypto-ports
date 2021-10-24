
export default function DeletePort(props) {
  return (
    <div onClick={() => props.updateMsgModal(false)} className="modal-bg">
      <div className="msg-modal">
        <h1>Delete <span className="msg-port-name">"{props.port.alias}"</span>?</h1>
        <div className="msg-btns">
          <button onClick={() => props.handleDeletePort(props.port.id)}className="yes-btn">Yes</button>
          <button onClick={() => props.updateMsgModal(false)}className="no-btn">No</button>
        </div>
      </div>
    </div>
  )
}
