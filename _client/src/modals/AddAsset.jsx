import { useEffect, useState, useContext } from 'react'
import DropdowMenu from '../components/DropdowMenu'
import { getAllSymbols } from '../services/symbols'
import ModalLayout from './ModalLayout'
import { UserContext } from "../App";


export default function AddAsset(props) {

  const user = useContext(UserContext)

  const [moreInfo, showMoreInfo] = useState(false)

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

  // FETCH AND SET SYMBOLS
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

  // HELPER FUNCTION
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

  // HELPER FUNCTION
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

  // HANDLE FORM INPUT SELECTIONS
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

  // HANDLE FORM DROPDOWN SELECTIONS
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

  // CREATE AND GET NEW PORTFOLIO
  const getPort = async (e) => {
    const portfolio = await props.handleAddAsset(e, 'port', formData)
    if (portfolio) {
      
      setFormData((prevData) => ({
        ...prevData,
        portfolio_id: portfolio.id,
        allocation_currency: portfolio.name
      }))
    }
  }

  // MORE INFO POPUP LOGIC
  const infoIcon = (idx) => (<span
    className="material-icons md-18"
    onMouseLeave={() => showMoreInfo(false)}
    onMouseEnter={() => showMoreInfo(idx)}
  >help_outline</span>)

  const popup = (key, allocation_c = "", symbol = "") => {
    const info = {
      alias: 'The name of this portfolio',
      name: 'The currency you want to earn more of',
      symbol: `symbol of the asset you bought with ${allocation_c}`,
      allocation: `How much ${allocation_c} you spent for ${symbol}`,
      quantity: `How much ${symbol} did you buy with your allocation`,
      allocation_currency: 'the asset you are tracking in this portfolio'
    }
    return (<div className="popup" >
      <p>{info[key]}</p>
    </div >)
  }

  return (
    <ModalLayout modal='asset' updateModal={props.updateModal}>
      <div className="forms">
        <p>Add assets to an existing portfolio or start a new portfolio here.</p>
        {/* CREATE PORT FORM */}
        <form
          className="port-form"
          onSubmit={(e) => getPort(e)}>
          <div
            className="form-dropdown"
            onMouseLeave={() => updateDropdown((prev) => ({ ...prev, portfolio: false }))}
            onMouseEnter={() => updateDropdown((prev) => ({ ...prev, portfolio: true }))}
          >
            <label htmlFor="portfolio">Portfolio {infoIcon(1)}{moreInfo === 1 && popup('alias')}</label>
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
            onMouseLeave={() => updateDropdown((prev) => ({ ...prev, symbol1: false }))}
            onMouseEnter={() => updateDropdown((prev) => (!queries.portfolioQueries.length && { ...prev, symbol1: true }))}
          >
            <label htmlFor="more">More of {infoIcon(2)}{moreInfo === 2 && popup('name')}</label>
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
          <button disabled={queries.portfolioQueries.length} className="submit-btn" type="submit">
            <span className="material-icons">
              create_new_folder
            </span>
          </button>
        </form>

        {/* CREATE ASSET FORM */}
        {formData.portfolio_id && <form className="asset-form" onSubmit={(e) => props.handleAddAsset(e, 'asset', formData)}>
          <div className="form-dropdown"
            onMouseLeave={() => updateDropdown((prev) => ({ ...prev, symbol2: false }))}
            onMouseEnter={() => updateDropdown((prev) => (formData.portfolio_id && { ...prev, symbol2: true }))}
          >
            <label htmlFor="symbol">
              Symbol {infoIcon(3)}{moreInfo === 3 && popup('symbol', formData.allocation_currency)}
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
              Allocation {infoIcon(4)}{moreInfo === 4 && popup('allocation', formData.allocation_currency, formData.symbol)}
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
              Quantity  {infoIcon(5)}{moreInfo === 5 && popup('quantity', null, formData.symbol)}
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
              Allocation Currency  {infoIcon(6)}{moreInfo === 6 && popup('allocation_currency')}
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
        }
      </div>
    </ModalLayout>
  )
}