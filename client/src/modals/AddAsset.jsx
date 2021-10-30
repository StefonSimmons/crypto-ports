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
    portfolio_id: "",
    portfolio_alias: ""
  })

  const [portfolioQueries, updateQuery ] = useState([])

  useEffect(() => {
    updateQuery(props.portfolios)
    const fetchSymbols = async () => {
      const data = await getAllSymbols()
      setSymbols(data.map((asset) => asset.symbol))
    }
    // fetchSymbols()
  }, [props.portfolios])

  const filter = (value) => {
    if (value) {
      updateQuery(props.portfolios.filter(port => (
        `${port.alias} ${port.name}`.toLowerCase().includes(value.toLowerCase())))
      )
    } else {
      updateQuery(props.portfolios)
    }
  }

  const handleChange = (e, ports) => {
    const { name, value, id } = e.target
    console.log(id)
    setAsset((prevAsset) => ({
      ...prevAsset,
      [name]: value,
      portfolio_id: parseInt(id)
    }))
    updateDropdown(true)
    filter(value)
  }

  return (
    <ModalLayout modal='asset' updateModal={props.updateModal}>
      <div className="forms">
        <form className="port-form">
          <div
            className="port-form-dropdown"
            onMouseEnter={() => updateDropdown(true)}
            onMouseLeave={() => updateDropdown(false)}
          >
            <input
              placeholder="PORTFOLIO"
              onChange={(e) => handleChange(e)}
              value={asset.portfolio_alias}
              name="portfolio_alias"
              autocomplete="off"
            />
            <ul className={`port-form-options ${toggleDropdown ? 'open' : 'close'}`}>
              {portfolioQueries.length ?
                portfolioQueries.map((portfolio, _, ports) => (
                <li key={portfolio.id}>
                  <input
                    id={portfolio.id}
                    className="port-option"
                    type="radio"
                    value={portfolio.alias}
                    name="portfolio_id"
                    onChange={(e) => handleChange(e, ports)}
                  />
                  <label htmlFor={portfolio.id}>{portfolio.alias}</label>
                  </li>
                ))
                :
                <li>
                  <p>No port found! But, you can add a new one.</p>
                </li>
            }
            </ul>
          </div>
          <input
            disabled={portfolioQueries.length}
            type="text"
            className="port-form-currency"
            placeholder="Currency" />
          <button disabled={portfolioQueries.length} className="submit-btn" type="submit">✔</button>
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
