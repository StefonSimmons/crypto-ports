import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import ModalLayout from './ModalLayout'
import { UserContext } from '../App'

export default function Ports(props) {
  const user = useContext(UserContext)
  const [editPortID, initPortEdit] = useState(null)
  const [portData, updatePortData] = useState({
    name: '',
    alias: '',
    user_id: user.id
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
    <ModalLayout modal='ports' updateModal={props.updateModal}>
      <div className="portfolios">
        { props.portfolios.length ?
            props.portfolios.map(portfolio => (
              <React.Fragment key={portfolio.id}>
                {editPortID !== portfolio.id ?
                  // All Ports
                  <div className="portfolio">
                    <Link
                      to={`/portfolios/${portfolio.id}`}
                      onClick={() => {
                        props.updateModal(prevModal => ({ ...prevModal, ports: false }))
                      }}
                    >
                      {portfolio.alias}
                    </Link>

                    <div className="mutables">
                      <button onClick={() => initPortEdit(portfolio.id)} className="edit-btn">Rename</button>
                      <button
                        onClick={() => {
                          props.updateMsgModal({
                            alias: portfolio.alias,
                            id: portfolio.id
                          })
                        }}
                        className="delete-btn">
                        <span className="material-icons">
                        delete_outline
                        </span>
                      </button>
                    </div>
                  </div>
                  :
                  // Edit Form
                  <form
                    className="portfolio"
                    onSubmit={(e) => {
                      props.handleEditPort(e, editPortID, portData)
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
            ))
          :
          <h2>{`You dont have any portfolios yet. Create portfolios when you `} 
            <button onClick={() => {
            props.updateModal(prevModal => ({ ...prevModal, asset: true, ports: false }))
            }}>add an asset</button>
          </h2>
        }
      </div>
    </ModalLayout>

  )
}
