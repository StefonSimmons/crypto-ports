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

  // const [portfolio, setPortfolio] = useState({
  //   name: "",
  //   alias: "",
  //   user_id: 1
  // })

  const [formData, setFormData] = useState({
    symbol: "",
    allocation: "",
    quantity: "",
    allocation_currency: "",
    portfolio_id: "",
    user_id: 1,
    name: "",
    alias: ""
  })

  const [symbols, setSymbols] = useState([])

  const [queries, updateQuery] = useState({
    portfolioQueries: [],
    symbolQueries: []
  })

  useEffect(() => {
    const fetchSymbols = async () => {
      const symbols = await getAllSymbols()
      setSymbols(symbols)
      updateQuery({
        symbolQueries: symbols,
        portfolioQueries: props.portfolios
      })
    }
    fetchSymbols()
  }, [props.portfolios])


  const portFilter = (value) => {
    if (value) {
      updateQuery((prevQuery) => ({
        ...prevQuery,
        portfolioQueries: props.portfolios.filter(port => (
          `${port.alias} ${port.name}`.toLowerCase().includes(value.toLowerCase())))
      }))
    } else {
      updateQuery((prevQuery) => ({
        ...prevQuery,
        portfolioQueries: props.portfolios
      }))
    }
  }

  const symbolFilter = (value) => {
    if (value) {
      updateQuery((prevQuery) => ({
        ...prevQuery,
        symbolQueries: symbols.filter(symbol => (
          symbol.symbol.toLowerCase().includes(value.toLowerCase())))
      }))
    } else {
      updateQuery((prevQuery) => ({
        ...prevQuery,
        symbolQueries: symbols
      }))
    }
  }

  const handleChange = (e, dropdown) => {
    const { name, value } = e.target

    // set form data for assets or port
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    // toggle dropdown
    updateDropdown((prev) => ({
      ...prev,
      [dropdown]: true
    }))

    // filter dropdown
    if (dropdown.includes('portfolio')) {
      portFilter(value)
    } else {
      symbolFilter(value)
    }
  }

  const handleSelection = (e) => {
    const { name, value } = e.target
    // set form data for assets or port
    console.log(name, value)
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    if (name === 'alias') {
      const id = e.target.getAttribute("data-port-id")
      console.log(id)
      setFormData((prevData) => ({
        ...prevData,
        portfolio_id: parseInt(id)
      }))
    }
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
            <label htmlFor="portfolio">Portfolio</label>
            <input
              id="portfolio"
              placeholder="PORTFOLIO"
              type="text"
              onChange={(e) => handleChange(e, 'portfolio')}
              value={formData.alias}
              name="alias"
              autoComplete="off"
            />
            <DropdowMenu
              toggleDropdown={toggleDropdowns.portfolio}
              handleChange={handleSelection}
              noOptionsMsg="No port found! But, you can add a new one."
              queriedOptions={queries.portfolioQueries}
              value="alias"
              name="alias"
            />
          </div>
          <div
            className="form-dropdown"
            onMouseEnter={() => updateDropdown((prev) => (!queries.portfolioQueries.length && { ...prev, symbol1: true }))}
            onMouseLeave={() => updateDropdown((prev) => ({ ...prev, symbol1: false }))}
          >
            <label htmlFor="more">More:</label>
            <input
              id="more"
              placeholder="I want more"
              type="text"
              onChange={(e) => handleChange(e, 'symbol1')}
              value={formData.name}
              name="name"
              className="port-form-currency"
              disabled={queries.portfolioQueries.length}
              autoComplete="off"
            />
            <DropdowMenu
              toggleDropdown={toggleDropdowns.symbol1}
              handleChange={handleSelection}
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
            <label htmlFor="symbol">
              Symbol:
              </label>
              <input
                id="symbol"
                placeholder="SYMBOL"
                onChange={(e) => handleChange(e, 'symbol2')}
                value={formData.symbol}
                name="symbol"
                autoComplete="off"
                />
            <DropdowMenu
              toggleDropdown={toggleDropdowns.symbol2}
              handleChange={handleSelection}
              noOptionsMsg="No symbols found!"
              queriedOptions={queries.symbolQueries}
              value="symbol"
              name="symbol"
            />
          </div>
          <label htmlFor="allocation">
            Allocation:
          </label>
          <input
            id="allocation"
            type="text"
            placeholder="ALLOCATION"
            onChange={(e) => handleSelection(e)}
            value={formData.allocation}
            name="allocation"
          />
          <label htmlFor="quantity">
            Quantity:
          </label>
          <input
            id="quantity"
            type="text"
            placeholder="QUANTITY"
            onChange={(e) => handleSelection(e)}
            value={formData.quantity}
            name="quantity"
          />
          <label htmlFor="allocation currency">
            Allocation Currency:
          </label>
          <input
            type="text"
            placeholder="ALLOCATION CURRENCY"
            onChange={(e) => handleSelection(e)}
            value={formData.allocation_currency}
            name="allocation_currency"
          />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </ModalLayout>
  )
}