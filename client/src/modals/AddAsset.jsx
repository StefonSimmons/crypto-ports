import { useEffect, useState } from 'react'
import { getAllSymbols } from '../services/symbols'
import ModalLayout from './ModalLayout'


export default function AddAsset(props) {
  const [symbols, setSymbols] = useState([])
  const [toggleDropdown, updateDropdown] = useState(false)

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
          {/* <input placeholder="CHOOSE or CREATE PORT" list="portfolios" />
          <datalist id="portfolios">
            {props.portfolios.map(portfolio => (
              <option key={portfolio.id} value={`${portfolio.alias} (ID: ${portfolio.id})`}>{portfolio.alias}</option>
            ))}
          </datalist> */}
          <div
            className="port-form-dropdown"
            onMouseEnter={() => updateDropdown(prevTogg => !prevTogg)}
            onMouseLeave={() => updateDropdown(prevTogg => !prevTogg)}
          >
            <input
              placeholder="CHOOSE or CREATE PORT"/>
            <ul className={`port-form-options ${toggleDropdown ? 'open':'close'}`}>
              {props.portfolios.map(portfolio => (
                <li key={portfolio.id}>
                  <input id={portfolio.alias} type="checkbox" value={portfolio.id} />
                  <label htmlFor={portfolio.alias}>{portfolio.alias}</label>
                </li>
              ))}
            </ul>
          </div>
          <button className="submit-btn" type="submit">P</button>
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
