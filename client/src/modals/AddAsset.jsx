import { useEffect, useState, useContext } from 'react'
import DropdowMenu from '../components/DropdowMenu'
import { getAllSymbols } from '../services/symbols'
import ModalLayout from './ModalLayout'
import { UserContext } from "../App";


export default function AddAsset(props) {

  const user = useContext(UserContext)


  const [formData, setFormData] = useState({
    symbol: "",
    allocation: "",
    quantity: "",
    allocation_currency: "",
    portfolio_id: "",
    user_id: user.id,
    name: "",
    alias: ""
  })

  const [symbols, setSymbols] = useState([])

  const [queries, updateQuery] = useState({
    portfolioQueries: [],
    symbolQueries: []
  })

  const [toggleDropdowns, updateDropdown] = useState({
    portfolio: false,
    symbol1: false,
    symbol2: false
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
      setFormData((prevData) => ({
        ...prevData,
        portfolio_id: "",
        allocation_currency: "",
        name: ""
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
      [name]: value.toUpperCase(),
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

  const handleSelection = (e, dropdown) => {
    const { name, value } = e.target
    // set form data for assets or port
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    if (name === 'alias') {
      const id = e.target.getAttribute("data-port-id")
      setFormData((prevData) => ({
        ...prevData,
        portfolio_id: parseInt(id),
        allocation_currency: props.portfolios.find(port => port.id === parseInt(id)).name
      }))
    }
    updateDropdown((prev) => ({
      ...prev,
      [dropdown]: false
    }))
  }


  return (
    <ModalLayout modal='asset' updateModal={props.updateModal}>
      <div className="forms">
        <p>Add assets to an existing portfolio or start a new portfolio here.</p>
        {/* CREATE PORT FORM */}
        <form
          className="port-form"
          onSubmit={(e) => {
            const getPort = async () => {
              const portfolio = await props.handleAddAsset(e, 'port', formData)
              setFormData((prevData) => ({
                ...prevData,
                portfolio_id: portfolio.id,
                allocation_currency: portfolio.name
              }))
            }
            getPort()
          }}>
          <div
            className="form-dropdown"
            onMouseEnter={() => updateDropdown((prev) => ({ ...prev, portfolio: true }))}
            onMouseLeave={() => updateDropdown((prev) => ({ ...prev, portfolio: false }))}
          >
            <label htmlFor="portfolio">Portfolio:</label>
            <input
              id="portfolio"
              required
              placeholder="PORTFOLIO"
              type="text"
              onChange={(e) => handleChange(e, 'portfolio')}
              value={formData.alias}
              name="alias"
              autoComplete="off"
            />
            <DropdowMenu
              toggleDropdown={[toggleDropdowns.portfolio, 'portfolio']}
              handleChange={handleSelection}
              noOptionsMsg="No ports found, but you can create a new one here. You can name your portfolio anything. ('My Bitcoin Port', 'Trading-ETH' etc.)"
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
            <label htmlFor="more">More of:</label>
            <input
              id="more"
              required
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
              toggleDropdown={[toggleDropdowns.symbol1, 'symbol1']}
              handleChange={handleSelection}
              noOptionsMsg="No symbols found!"
              queriedOptions={queries.symbolQueries}
              value="symbol"
              name="name"
            />
          </div>
          <button disabled={queries.portfolioQueries.length} className="submit-btn" type="submit">✔</button>
        </form>
        
        {/* CREATE ASSET FORM */}
        <form className="asset-form" onSubmit={(e) => props.handleAddAsset(e, 'asset', formData)}>
          <div className="form-dropdown"
            onMouseEnter={() => updateDropdown((prev) => (formData.portfolio_id && { ...prev, symbol2: true }))}
            onMouseLeave={() => updateDropdown((prev) => ({ ...prev, symbol2: false }))}
          >
            <label htmlFor="symbol">
              Symbol:
            </label>
            <input
              id="symbol"
              required
              placeholder="SYMBOL"
              onChange={(e) => handleChange(e, 'symbol2')}
              value={formData.symbol}
              name="symbol"
              disabled={!formData.portfolio_id}
              autoComplete="off"
            />
            <DropdowMenu
              toggleDropdown={[toggleDropdowns.symbol2, 'symbol2']}
              handleChange={handleSelection}
              noOptionsMsg="No symbols found!"
              queriedOptions={queries.symbolQueries}
              value="symbol"
              name="symbol"
            />
          </div>
          <div className="asset-input-wrapper">
            <label htmlFor="allocation">
              Allocation:
            </label>
            <input
              id="allocation"
              required
              type="text"
              placeholder="ALLOCATION"
              onChange={(e) => handleSelection(e)}
              value={formData.allocation}
              name="allocation"
              disabled={!formData.portfolio_id}
            />
          </div>
          <div className="asset-input-wrapper">
            <label htmlFor="quantity">
              Quantity:
            </label>
            <input
              id="quantity"
              type="text"
              required
              placeholder="QUANTITY"
              onChange={(e) => handleSelection(e)}
              value={formData.quantity}
              name="quantity"
              disabled={!formData.portfolio_id}
            />
          </div>
          <div className="asset-input-wrapper">
            <label htmlFor="allocation_currency">
              Allocation Currency:
            </label>
            <input
              id="allocation_currency"
              required
              type="text"
              placeholder="ALLOCATION CURRENCY"
              onChange={(e) => handleSelection(e)}
              value={formData.allocation_currency}
              name="allocation_currency"
              disabled={true}
            />
          </div>
          <button type="submit" disabled={!queries.portfolioQueries.length}>SUBMIT</button>
        </form>
      </div>
    </ModalLayout>
  )
}