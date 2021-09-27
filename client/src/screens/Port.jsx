import { useEffect, useState } from "react"
import { useParams } from "react-router"
// import { getPortfolioAssets } from "../services/assets"
import data from './assets.json'

export default function Port({portfolios}) {
  const [assets, setAssets] = useState([])
  const [portfolio, setPortfolio] = useState('')

  const { id } = useParams()

  useEffect(() => {
    const port = portfolios.find(port => port.id === parseInt(id))
    setPortfolio(port?.alias)
  }, [id])

  useEffect(() => {
    // const fetchPortfolioAssets = async () => {
    //   const data = await getPortfolioAssets(1, 2)
    //   setAssets(data)
    // }
    // fetchPortfolioAssets()
    setAssets(data)
  }, [])



  return (
    <section className="port-screen">
      <div className="port-name-container">
        <h1>{portfolio}</h1>
      </div>
      <div className="port-asset-container">
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
      </div>
    </section>
  )
}
