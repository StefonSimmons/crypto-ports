import { useEffect, useState, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getPortfolioAssets } from "../services/assets"
import { UserContext } from "../App"

export default function Port({ portfolios, updateModal, setAsset, setAssets, assets, reload }) {
  const [portfolio, setPortfolio] = useState({})

  const user = useContext(UserContext)

  const [totalValue, setTotalValue] = useState(0)
  
  const [isDisabled, setIsDisabled] = useState({prev: false, next: false})

  const [currentIndex, setCurrentIndex] = useState(null)

  const { id } = useParams()

  const history = useHistory()

  useEffect(() => {
    const port = portfolios.find(port => port.id === parseInt(id))
    setPortfolio(port)
    const currIndex = portfolios.findIndex((port) => port.id === parseInt(id))
    setCurrentIndex(currIndex)
  }, [id, portfolios])

  useEffect(() => {
    const max = portfolios.length -1
    if(currentIndex === 0){
      setIsDisabled({prev: true, next: false})
    }else if(currentIndex === max && currentIndex !== -1){
      setIsDisabled({prev: false, next: true})
    }else{
      setIsDisabled({prev: false, next: false})
    }
  }, [currentIndex, portfolios.length])

  useEffect(() => {
    const fetchPortfolioAssets = async () => {
      const data = await getPortfolioAssets(user?.id, parseInt(id))
      setAssets(data)
    }
    if (user?.id) {
      fetchPortfolioAssets()
    }
  }, [id, user?.id, reload, setAssets])


  useEffect(() => {
    const portSum = assets?.reduce((acc, curr) => curr.value + acc, 0)
    setTotalValue(portSum)
  }, [assets, totalValue])

  const navigatePorts = (direction) => {
      const nextPort = portfolios.find((_,idx) => idx === (currentIndex + direction))
      history.push(`/portfolios/${nextPort?.id}`)   
  }

  // useEffect(() => {
  //   document.addEventListener('keydown', (e) => {
  //     console.log(e.key)
  //     if(e.key === "ArrowLeft"){
  //       navigatePorts(-1)
  //     }else if(e.key === "ArrowRight"){
  //       navigatePorts(1)
  //     }
  //   })
  // }, [navigatePorts])

  return (
    <section className="port-screen">
      <div className="port-name-container">
        <div className="prev-container">
          <button onClick={() => navigatePorts(-1)} disabled={isDisabled.prev}><div className="arrow arrow-prev"></div></button>
        </div>
        <h1>{portfolio?.alias}</h1>
        <div className="next-container">
          <button onClick={() => navigatePorts(1)} disabled={isDisabled.next}><div className="arrow arrow-next"></div></button>
        </div>
      </div>
      <div>
        <hr />
        <div className="port-sum-container">
          <h2>Total Allocation: {portfolio?.total_allocation?.roundSum(portfolio)}</h2>
          <h2>Total Value: {totalValue.roundSum(portfolio)}</h2>
          <h2>{`Total Earned: `} 
            <span className={(totalValue - portfolio?.total_allocation) > 0 ? 'green' : 'red'}>
              {(totalValue - portfolio?.total_allocation).roundSum(portfolio)}
            </span>
          </h2>
        </div>
        <hr />
      </div>
      <div className="port-asset-container">
        <hr />
        <div className="port-header">
          <h2>Asset</h2>
          <h2>Allocation</h2>
          <h2>Quantity</h2>
          <h2>Cost Basis</h2>
          <h2>Price</h2>
          <h2>Value</h2>
          <h2>Change</h2>
          <h2>% Change</h2>
          <h2>% of Port</h2>
          <h2>% of Curr Port</h2>
        </div>
        <hr />
        <div className="port-assets">
          {assets.length ? assets.map(asset => {
            // eslint-disable-next-line
            Number.prototype.round = function (dollar = true, percentage = false) {
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
                <p>{asset.cost_basis.round()}</p>
                <p>{asset.price.round()}</p>
                <p>{asset.value.round()}</p>
                <p>{asset.value_change.round()}</p>
                <p className={asset.percent_change > 0 ? 'green' : 'red'}>{`${asset.percent_change.round(false, true)}%`}</p>
                <p>{`${asset.percent_of_port.round(false, true)}%`}</p>
                <p>{`${asset.percent_of_curr_port.round(false, true)}%`}</p>
              </div>
            )
          }) :
            <h2 className="no-assets-msg">{`You dont have any assets here. `}
              <button onClick={() => {
                updateModal(prevModal => ({ ...prevModal, asset: true }))
              }}>add an asset</button>
            </h2>}
        </div>
      </div>
    </section>
  )
}
