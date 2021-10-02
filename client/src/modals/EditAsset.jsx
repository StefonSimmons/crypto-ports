import { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";
import { getAllSymbols } from '../services/symbols'

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
    // fetchSymbols()
  }, [])

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

        <form className="asset-form">
          <input placeholder="SYMBOL" list="symbols" value={formData.symbol} />
          <datalist id="symbols">
            {symbols.map((symbol, idx) => (
              <option key={idx} value={symbol}>{symbol}</option>
            ))}
          </datalist>
          <input type="text" placeholder="ALLOCATION" value={formData.allocation} />
          <input type="text" placeholder="QUANTITY" value={formData.quantity} />
          <input type="text" placeholder="ALLOCATION CURRENCY" value={formData.allocation_currency} />
          <div className="buttons">
            <button type="submit" className="submit-btn">SAVE</button>
            <button type="submit" className="delete-btn">DELETE</button>
          </div>
        </form>
      </div>
    </ModalLayout>
  )
}
