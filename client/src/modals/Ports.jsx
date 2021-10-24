import { useState } from 'react'
import { Link } from 'react-router-dom'
import ModalLayout from './ModalLayout'

export default function Ports(props) {
  const [portID, initPortEdit] = useState(null)
  const [portData, updatePortData] = useState({
    name: '',
    alias: '',
    user_id: ''
  })

  const handleChange = (e) => {
    const { value, name } = e.target
    console.log(name, value)
  }

  return (
    <ModalLayout modal='port' updateModal={props.updateModal}>
      <div className="portfolios">
        {props.portfolios.map(portfolio => (
          <>
            {portID != portfolio.id ?
              <div key={portfolio.id} className="portfolio">
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
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
              :
              <form className="portfolio">
                <input
                  type="text"
                  name={portData.alias} 
                  value={portfolio.alias}
                  onChange={(e) => handleChange(e)}
                  className='port-alias'
                />
                <input type="submit" value="Save" className="save-btn" />
              </form>
            }
          </>
        ))}
      </div>
    </ModalLayout>

  )
}
