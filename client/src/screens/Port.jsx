import { useEffect, useState } from "react"
import { getPortfolioAssets } from "../services/assets"

export default function Port() {
  const [assets, setAssets] = useState([])
  
  
  useEffect(() => {
    const fetchPortfolioAssets = async () => {
      const data = await getPortfolioAssets(1, 2)
      setAssets(data)
    }
    // fetchPortfolioAssets()
  },[])

  return (
    <section className="port-screen">

    </section>
  )
}
