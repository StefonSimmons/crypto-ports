import { useEffect, useState } from 'react'
import close from '../assets/imgs/close.svg'

import { getAllSymbols } from '../services/symbols'
import { getUserPortfolios } from '../services/portfolios'

export default function AddAsset(props) {
  const [symbols, setSymbols] = useState([])
  const [portfolios, setPortfolios] = useState([])

  useEffect(() => {
    const fetchSymbols = async () => {
      const data = await getAllSymbols()
      setSymbols(data.map((asset) => asset.symbol))
    }
    // fetchSymbols()
  }, [])

  useEffect(() => {
    const fetchPortfolios = async () => {
      const data = await getUserPortfolios(1)
      setPortfolios(data)
    }
    fetchPortfolios()
  }, [])

  return (
    <div className="modal-bg">
      <section className="add-asset-modal">
        <header>
          <h1>Asset</h1>
          <img
            src={close}
            alt="close"
            class="close"
            onClick={()=> props.updateAssetModal(false)}
          />
        </header>
        <div className="forms">
          <form className="port-form">
            <input placeholder="PORTFOLIO" list="portfolios" />
            <datalist id="portfolios">
              {portfolios.map(portfolio => (
                <option key={portfolio.id} value={portfolio.id}>{portfolio.alias}</option>
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
      </section>
    </div>
  )
}
