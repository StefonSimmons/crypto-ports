import { useEffect, useState } from 'react'

import { getAllSymbols } from '../services/symbols'
import ModalLayout from './ModalLayout'

export default function AddAsset(props) {
  const [symbols, setSymbols] = useState([])

  useEffect(() => {
    const fetchSymbols = async () => {
      const data = await getAllSymbols()
      setSymbols(data.map((asset) => asset.symbol))
    }
    // fetchSymbols()
  }, [])

  return (
    <ModalLayout modal='asset' updateModal={props.updateModal}>
      <div className="forms">
        <form className="port-form">
          <input placeholder="CHOOSE or CREATE PORT" list="portfolios" />
          <datalist id="portfolios">
            {props.portfolios.map(portfolio => (
              <option key={portfolio.id} value={`${portfolio.alias} (ID: ${portfolio.id})`}>{portfolio.alias}</option>
            ))}
          </datalist>
          <button type="submit">P</button>
        </form>

        <form className="asset-form">
          <input placeholder="SYMBOL" list="symbols" />
          <datalist id="symbols">
            {symbols.map((symbol, idx) => (
              <option key={idx} value={symbol}>{symbol}</option>
            ))}
          </datalist>
          <input type="text" placeholder="ALLOCATION" />
          <input type="text" placeholder="QUANTITY" />
          <input type="text" placeholder="ALLOCATION CURRENCY" />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </ModalLayout>
  )
}
