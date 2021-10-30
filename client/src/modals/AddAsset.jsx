import { useEffect, useState } from 'react'
import DropdowMenu from '../components/DropdowMenu'
import { getAllSymbols } from '../services/symbols'
import ModalLayout from './ModalLayout'


export default function AddAsset(props) {
  // const [symbols, setSymbols] = useState([])
  const [toggleDropdowns, updateDropdown] = useState({
    portfolio: false,
    symbol1: false,
    symbol2: false
  })

  const [portfolio, setPortfolio] = useState({
    name: "",
    alias: "",
    user_id: 1
  })

  const [asset, setAsset] = useState({
    symbol: "",
    allocation: "",
    quantity: "",
    allocation_currency: "",
    user_id: 1,
    portfolio_id: "",
  })

  const [queries, updateQuery] = useState({
    portfolioQueries: [],
    symbolQueries: []
  })

  useEffect(() => {
    const fetchSymbols = async () => {
      const symbols = await getAllSymbols()
      updateQuery({
        symbolQueries: symbols,
        portfolioQueries: props.portfolios
      })
    }
    // fetchSymbols()
  }, [props.portfolios])


  const filter = (value) => {
    if (value) {
      updateQuery((prevQuery) => ({
        ...prevQuery,
        portfolioQueries: props.portfolios.filter(port => (
          `${port.alias} ${port.name}`.toLowerCase().includes(value.toLowerCase())))
      }))
    } else {
      updateQuery(props.portfolios)
    }
  }

  const handlePortChange = (e) => {
    const { name, value } = e.target
    setPortfolio(prevPort => ({
      ...prevPort,
      [name]: value,
    }))
  }

  const handleAssetChange = (e, dropdown) => {
    const { name, value, id } = e.target
    setAsset((prevAsset) => ({
      ...prevAsset,
      [name]: value,
      portfolio_id: parseInt(id)
    }))
    updateDropdown((prev) => ({
      ...prev,
      [dropdown]: true
    }))
    filter(value)
  }

  return (
    <ModalLayout modal='asset' updateModal={props.updateModal}>
      <div className="forms">
        <p>Choose a portfolio to add your asset to or start a new portfolio. </p>
        <form className="port-form">
          <div
            className="form-dropdown"
            onMouseEnter={() => updateDropdown((prev) => ({ ...prev, portfolio: true }))}
            onMouseLeave={() => updateDropdown((prev) => ({ ...prev, portfolio: false }))}
          >
            <input
              placeholder="PORTFOLIO"
              type="text"
              onChange={(e) => handlePortChange(e, 'portfolio')}
              value={asset.portfolio_alias}
              name="alias"
              autocomplete="off"
            />
            <DropdowMenu
              toggleDropdown={toggleDropdowns.portfolio}
              handleChange={handlePortChange}
              noOptionsMsg="No port found! But, you can add a new one."
              queriedOptions={queries.portfolioQueries}
              value="alias"
              name="name"
            />
          </div>
          <div
            className="form-dropdown"
            onMouseEnter={() => updateDropdown((prev) => ({ ...prev, symbol1: true }))}
            onMouseLeave={() => updateDropdown((prev) => ({ ...prev, symbol1: false }))}
          >
            <input
              placeholder="I want more"
              type="text"
              onChange={(e) => handlePortChange(e, 'symbol1')}
              className="port-form-currency"
              disabled={queries.portfolioQueries.length}
              autoComplete="false"
            />
            <DropdowMenu
              toggleDropdown={toggleDropdowns.symbol1}
              handleChange={handlePortChange}
              noOptionsMsg="No symbols found!"
              queriedOptions={queries.symbolQueries}
              value="symbol"
              name="name"
            />
          </div>
          <button disabled={queries.portfolioQueries.length} className="submit-btn" type="submit">✔</button>
        </form>

        <form className="asset-form">
          <div className="form-dropdown"
            onMouseEnter={() => updateDropdown((prev) => ({ ...prev, symbol2: true }))}
            onMouseLeave={() => updateDropdown((prev) => ({ ...prev, symbol2: false }))}

          >
            <input
              placeholder="SYMBOL"
            />
            <DropdowMenu
              toggleDropdown={toggleDropdowns.symbol2}
              handleChange={handleAssetChange}
              noOptionsMsg="No symbols found!"
              queriedOptions={queries.symbolQueries}
              value="symbol"
              name="portfolio_id"
            />
          </div>
          {/* <datalist id="symbols">
            {queries.symbolQueries.map((symbol, idx) => (
              <option key={idx} value={symbol}>{symbol}</option>
            ))}
          </datalist> */}
          <input type="text" placeholder="ALLOCATION" />
          <input type="text" placeholder="QUANTITY" />
          <input type="text" placeholder="ALLOCATION CURRENCY" />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </ModalLayout>
  )
}


{/* <ul className={`port-form-options ${toggleDropdown ? 'open' : 'close'}`}>
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
            </ul> */}