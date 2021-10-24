import { useEffect, useState } from 'react'
import { Route } from 'react-router'
import Layout from '../layout/Layout'
import AddAsset from '../modals/AddAsset'
import EditAsset from '../modals/EditAsset'
import Ports from '../modals/Ports'
import Home from '../screens/Home'
import Port from '../screens/Port'
import { destroyUserPortfolio, getUserPortfolios } from '../services/portfolios'
import { updateUserPorfolio } from '../services/portfolios'
import DeletePort from './DeletePort'

export default function Main() {
  const [modal, updateModal] = useState({
    asset: false,
    port: true,
    edit: false,
  })
  const [deleteMsgModal, updateMsgModal] = useState(false)

  const [asset, setAsset] = useState({})

  const [portfolios, setPortfolios] = useState([])

  useEffect(() => {
    const fetchPortfolios = async () => {
      const data = await getUserPortfolios(1)
      setPortfolios(data)
    }
    fetchPortfolios()
  }, [])

  // EDIT PORT
  const handleEditPort = async (e, portID, portData) => {
    e.preventDefault()
    const portfolio = await updateUserPorfolio(portID, portData)
    setPortfolios(prevPorts => (
      prevPorts.map(port => port.id === portID ? portfolio : port)
    ))
  }

  // DELETE PORT
  const handleDeletePort = async (portID) => {
    await destroyUserPortfolio(portID)
    setPortfolios(prevPorts => (
      prevPorts.filter(port => port.id != portID)
    ))
    updateMsgModal(false)
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
        updateMsgModal={updateMsgModal}
        />}
      {modal.edit && <EditAsset
        updateModal={updateModal}
        portfolios={portfolios}
        asset={asset}
      />}
      {deleteMsgModal && <DeletePort
        port={deleteMsgModal}
        updateMsgModal={updateMsgModal}
        handleDeletePort={handleDeletePort}
      />
      }
    </Layout>
  )
}
