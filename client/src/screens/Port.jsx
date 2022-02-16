import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { getPortfolioAssets } from "../services/assets"
import {UserContext} from "../App"

export default function Port({ portfolios, updateModal, setAsset, setAssets, assets, reload }) {
  const [portfolio, setPortfolio] = useState('')

  const user = useContext(UserContext)

  const { id } = useParams()

  useEffect(() => {
    const port = portfolios.find(port => port.id === parseInt(id))
    setPortfolio(port?.alias)
  }, [id, portfolios])

  useEffect(() => {
    const fetchPortfolioAssets = async () => {
      const data = await getPortfolioAssets(user?.id, parseInt(id))
      setAssets(data)
    }
    fetchPortfolioAssets()
  }, [id, user?.id, reload, setAssets])



  return (
    <section className="port-screen">
      <div className="port-name-container">
        <h1>{portfolio}</h1>
      </div>
      <div className="port-asset-container">
        <hr />
        <div className="port-header">
          <h2>Asset</h2>
          <h2>Allocation</h2>
          <h2>Quantity</h2>
          <h2>Price</h2>
          <h2>Value</h2>
          <h2>Change</h2>
          <h2>% Change</h2>
          <h2>% of Port</h2>
          <h2>% of Curr Port</h2>
          <h2>Cost Basis</h2>
        </div>
        <hr />
        <div className="port-assets">
          {assets.map(asset => {
            // eslint-disable-next-line
            Number.prototype.round = function (dollar = true, percentage=false) {
              if (asset.allocation_currency === 'USD' || percentage) {
                return `${dollar ? '$' : ''}${this.toFixed(2)}`
              }
              return this.toFixed(8)
            }
            return (
              <div
                key={asset.id}
                className="asset"
                onClick={() => {
                  updateModal(prevModal => ({
                    ...prevModal,
                    edit: true
                  }))
                  setAsset(asset)
                }}
              >
              <p>{asset.symbol}-{asset.allocation_currency}</p>
              <p>{asset.allocation.round()}</p>
              <p>{asset.quantity}</p>
              <p>{asset.price.round()}</p>
              <p>{asset.value.round()}</p>
              <p>{asset.value_change.round()}</p>
              <p>{`${asset.percent_change.round(false, true)}%`}</p>
              <p>{`${asset.percent_of_port.round(false, true)}%`}</p>
              <p>{`${asset.percent_of_curr_port.round(false, true)}%`}</p>
              <p>{asset.cost_basis.round()}</p>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
