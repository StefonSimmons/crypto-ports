import { useEffect, useState } from 'react'
import { Route } from 'react-router'
import Layout from '../layout/Layout'
import AddAsset from '../modals/AddAsset'
import EditAsset from '../modals/EditAsset'
import Ports from '../modals/Ports'
import Home from '../screens/Home'
import Port from '../screens/Port'
import { getUserPortfolios } from '../services/portfolios'
import { updateUserPorfolio } from '../services/portfolios'

export default function Main() {
  const [modal, updateModal] = useState({
    asset: false,
    port: true,
    edit: false,
  })

  const [asset, setAsset] = useState({})

  const [portfolios, setPortfolios] = useState([])

  useEffect(() => {
    const fetchPortfolios = async () => {
      const data = await getUserPortfolios(1)
      setPortfolios(data)
    }
    fetchPortfolios()
  }, [])

  const handleEditPort = async (e, portID, portData) => {
    e.preventDefault()
    const portfolio = await updateUserPorfolio(portID, portData)
    setPortfolios(prevPorts => (
      prevPorts.map(port => port.id === portID ? portfolio : port)
    ))
  }

  return (
    <Layout
      updateModal={updateModal}
      >
      <Route exact path="/" component={Home}/>
      <Route exact path="/portfolios/:id">
        <Port
          portfolios={portfolios}
          updateModal={updateModal}
          setAsset={setAsset}
          />
      </Route>
      
      {modal.asset && <AddAsset
        updateModal={updateModal}
        portfolios={portfolios}
      />}
      {modal.port && <Ports
        updateModal={updateModal}
        portfolios={portfolios}
        handleEditPort={handleEditPort}
        />}
      {modal.edit && <EditAsset
        updateModal={updateModal}
        portfolios={portfolios}
        asset={asset}
      />}
    </Layout>
  )
}
