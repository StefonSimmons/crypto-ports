import { Link } from 'react-router-dom'
import ModalLayout from './ModalLayout'

export default function Ports(props) {

  return (
    <ModalLayout modal='port' updateModal={props.updateModal}>
      <div className="portfolios">
        {props.portfolios.map(portfolio => (
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
              <p className="edit-btn">Edit</p>
              <p className="delete-btn">Delete</p>
            </div>
          </div>
        ))}
      </div>
    </ModalLayout>

  )
}
