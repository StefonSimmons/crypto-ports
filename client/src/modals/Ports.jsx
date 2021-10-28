import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ModalLayout from './ModalLayout'

export default function Ports(props) {
  const [portID, initPortEdit] = useState(null)
  const [portData, updatePortData] = useState({
    name: '',
    alias: '',
    user_id: 1
  })

  const handleChange = (e) => {
    const { value, name } = e.target

    updatePortData(prevData => ({
      ...prevData,
      name,
      alias: value
    }))
  }


  return (
    <ModalLayout modal='port' updateModal={props.updateModal}>
      <div className="portfolios">
        {props.portfolios.map(portfolio => (
          <React.Fragment key={portfolio.id}>
            {portID != portfolio.id ?
              // All Ports
              <div className="portfolio">
                <Link
                  to={`/portfolios/${portfolio.id}`}
                  onClick={() => {
                    props.updateModal(prevModal => ({ ...prevModal, port: false }))
                  }}
                >
                  {portfolio.alias}
                </Link>

                <div className="mutables">
                  <button onClick={() => initPortEdit(portfolio.id)} className="edit-btn">Edit</button>
                  <button
                    onClick={() => {
                      props.updateMsgModal({
                        alias: portfolio.alias,
                        id: portfolio.id
                      })
                    }}
                    className="delete-btn">Delete</button>
                </div>
              </div>
              :
              // Edit Form
              <form
                className="portfolio"
                onSubmit={(e) => {
                  props.handleEditPort(e, portID, portData)
                  initPortEdit(false)
                }}>
                <input
                  type="text"
                  name={portfolio.name}
                  value={portData.alias}
                  placeholder={portfolio.alias}
                  onChange={(e) => handleChange(e)}
                  className='port-alias'
                />
                <input type="submit" value="Save" className="save-btn" />
              </form>
            }
          </React.Fragment>
        ))}
      </div>
    </ModalLayout>

  )
}
