import { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";
import { getAllSymbols } from '../services/symbols'
import { updatePortfolioAsset } from "../services/assets"

export default function EditAsset(props) {


  const [formData, setFormData] = useState({
    symbol: props.asset.symbol,
    allocation: props.asset.allocation,
    quantity: props.asset.quantity,
    allocation_currency: props.asset.allocation_currency,
    portfolio_id: props.asset.portfolio_id,
    user_id: 1
  })
  const [symbols, setSymbols] = useState([])

  useEffect(() => {
    const fetchSymbols = async () => {
      const data = await getAllSymbols()
      setSymbols(data.map((asset) => asset.symbol))
    }
    fetchSymbols()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const asset = await updatePortfolioAsset(props.asset.id, formData)
    console.log(asset)
  }

  return (
    <ModalLayout modal='edit' updateModal={props.updateModal}>
      <div className="forms">
        <form className="port-form">
          <input
            placeholder="CHOOSE or CREATE PORT"
            list="portfolios"
            value={formData.portfolio_id}
          />
          <datalist id="portfolios">
            {props.portfolios.map(portfolio => (
              <option key={portfolio.id} value={`${portfolio.alias} (ID: ${portfolio.id})`}>{portfolio.alias}</option>
            ))}
          </datalist>
          <button type="submit">P</button>
        </form>

        <form
          className="asset-form"
          onSubmit={handleSubmit}
        >
          <input
            name="symbol"
            onChange={(e) => handleChange(e)}
            placeholder="SYMBOL"
            list="symbols"
            value={formData.symbol}
          />
          <datalist id="symbols">
            {symbols.map((symbol, idx) => (
              <option key={idx} value={symbol}>{symbol}</option>
            ))}
          </datalist>
          <input
            type="text"
            name="allocation"
            placeholder="ALLOCATION"
            value={formData.allocation}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="quantity"
            placeholder="QUANTITY"
            value={formData.quantity}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            name="allocation_currency"
            placeholder="ALLOCATION CURRENCY"
            value={formData.allocation_currency}
            onChange={(e) => handleChange(e)}
          />
          <div className="buttons">
            <button type="submit" className="submit-btn">SAVE</button>
            <button type="submit" className="delete-btn">DELETE</button>
          </div>
        </form>
      </div>
    </ModalLayout>
  )
}
