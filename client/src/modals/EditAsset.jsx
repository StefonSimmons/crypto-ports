import { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";

export default function EditAsset(props) {


  const [formData, setFormData] = useState({
    symbol: props.asset.symbol,
    allocation: props.asset.allocation,
    quantity: props.asset.quantity,
    allocation_currency: props.asset.allocation_currency,
    portfolio_id: props.asset.portfolio_id,
    user_id: 1
  })

  const [portfolio, setPortfolio] = useState('')


  useEffect(() => {
    const port = props.portfolios.find(port => port.id === formData.portfolio_id)
    setPortfolio(port?.alias)
  }, [formData.portfolio_id, props.portfolios])


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }



  return (
    <ModalLayout modal='edit' updateModal={props.updateModal}>
      <div className="forms">
        <div className="asset-read-only-info">
          <div className="read-only-wrapper">
            <span>Portfolio: </span>
            <p>{portfolio}</p>
          </div>
          <div className="read-only-wrapper">
            <span>Asset: </span>
            <p>{formData.symbol}</p>
          </div>
          <div className="read-only-wrapper">
            <span>Allocation Currency: </span>
            <p>{formData.allocation_currency}</p>
          </div>
        </div>
        <form
          className="asset-form"
          onSubmit={(e) => props.handleEditAsset(e, formData)}
        >
          <div className="asset-input-wrapper">
            <label htmlFor="allocation">Allocation:</label>
            <input
              id="allocation"
              type="text"
              name="allocation"
              placeholder="ALLOCATION"
              value={formData.allocation}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="asset-input-wrapper">
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="text"
              name="quantity"
              placeholder="QUANTITY"
              value={formData.quantity}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="buttons">
            <button type="submit" className="submit-btn">SAVE</button>
            <button
              type="button"
              className="delete-btn"
              onClick={() => props.handleDeleteAsset()}
            >DELETE</button>
          </div>
        </form>
      </div>
    </ModalLayout>
  )
}
