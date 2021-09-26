import { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import AddAsset from '../modals/AddAsset'
import Ports from '../modals/Ports'
import Home from '../screens/Home'
import { getUserPortfolios } from '../services/portfolios'

export default function Main() {
  const [modal, updateModal] = useState({
    asset: false,
    port: true
  })

  const [portfolios, setPortfolios] = useState([])

  useEffect(() => {
    const fetchPortfolios = async () => {
      const data = await getUserPortfolios(1)
      setPortfolios(data)
    }
    fetchPortfolios()
  }, [])

  return (
    <Layout
      updateModal={updateModal}
    >
      <Home />
      {modal.asset && <AddAsset
        updateModal={updateModal}
        portfolios={portfolios}
      />}
      {modal.port && <Ports
        updateModal={updateModal}
        portfolios={portfolios}
      />}
    </Layout>
  )
}
