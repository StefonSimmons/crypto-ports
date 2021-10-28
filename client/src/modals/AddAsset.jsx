import { useEffect, useState } from 'react'
import { getAllSymbols } from '../services/symbols'
import ModalLayout from './ModalLayout'


export default function AddAsset(props) {
  const [symbols, setSymbols] = useState([])
  const [toggleDropdown, updateDropdown] = useState(false)

  const [asset, setAsset] = useState({
    symbol: "",
    allocation: "",
    quantity: "",
    allocation_currency: "",
    user_id: 1,
    portfolio_id:""
  })

  useEffect(() => {
    const fetchSymbols = async () => {
      const data = await getAllSymbols()
      setSymbols(data.map((asset) => asset.symbol))
    }
    // fetchSymbols()
  }, [])


  const handleChange = (e) => {
    const { name, value } = e.target
    setAsset((prevAsset) => ({
      ...prevAsset,
      [name]: value
    }))
  }

  return (
    <ModalLayout modal='asset' updateModal={props.updateModal}>
      <div className="forms">
        <form className="port-form">
          <div
            className="port-form-dropdown"
            onMouseEnter={() => updateDropdown(prevTogg => !prevTogg)}
            onMouseLeave={() => updateDropdown(prevTogg => !prevTogg)}
          >
            <input
              placeholder="CHOOSE or CREATE PORT"
              onChange={(e) => handleChange(e)}
              value={asset.portfolio_id}
              name="portfolio_id"
              />
            <ul className={`port-form-options ${toggleDropdown ? 'open':'close'}`}>
              {props.portfolios.map(portfolio => (
                <li key={portfolio.id}>
                  <input
                    id={portfolio.alias}
                    type="radio"
                    value={portfolio.id}
                    name="portfolio_id"
                    onChange={(e) => handleChange(e)}
                  />
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
