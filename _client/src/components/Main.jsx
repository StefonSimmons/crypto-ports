import React, { useEffect, useState, useContext } from 'react'
import { Route, useHistory } from 'react-router'
import Layout from '../layout/Layout'
import AddAsset from '../modals/AddAsset'
import EditAsset from '../modals/EditAsset'
import Ports from '../modals/Ports'
import Home from '../screens/Home'
import Port from '../screens/Port'
import { destroyUserPortfolio, getUserPortfolios } from '../services/portfolios'
import { updateUserPorfolio, addUserPortfolio } from '../services/portfolios'
import { destroyPortfolioAsset } from "../services/assets";
import { updatePortfolioAsset, addPortfolioAsset } from '../services/assets'
import DeletePort from '../modals/DeletePort'
import SignIn from '../modals/SignIn'

import { UserContext } from '../App'
import SignUp from '../modals/SignUp'

export default function Main(props) {
  const [modal, updateModal] = useState({
    asset: false,
    ports: false,
    edit: false,
    signin: false,
    createanaccount: false
  })

  const user = useContext(UserContext)

  const [deleteMsgModal, updateMsgModal] = useState(false)

  const [asset, setAsset] = useState({})

  const [portfolios, setPortfolios] = useState([])

  const [assets, setAssets] = useState([])

  const [reload, triggerReload] = useState(false)

  const history = useHistory()

  // GET USER'S PORTFOLIOS
  useEffect(() => {
    const fetchPortfolios = async () => {
      const data = await getUserPortfolios(user?.id)
      setPortfolios(data)
    }
    // wait to verify user before getting user portfolios
    if (user?.id) {
      fetchPortfolios()
    }
  }, [user?.id, assets])

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
    const data = await destroyUserPortfolio(portID)
    if (data) {
      setPortfolios(prevPorts => (
        prevPorts.filter(port => port.id !== portID)
      ))
      updateMsgModal(false)
    }
    history.push("/")
  }

  // ADD PORTFOLIO AND ASSET
  const handleAddAsset = async (e, form, formData) => {
    e.preventDefault()
    const { name, alias, ...assetData } = formData
    if (form === "asset") {
      const asset = await addPortfolioAsset(assetData)
      history.push(`/portfolios/${asset.portfolio_id}`)
      updateModal(prevModal => ({ ...prevModal, asset: false }))
      triggerReload(prev => !prev)
    } else {
      const portData = {
        name,
        alias,
        user_id: formData.user_id
      }
      const portfolio = await addUserPortfolio(portData)
      setPortfolios((prevPorts) => ([
        ...prevPorts,
        portfolio
      ]))
      return portfolio
    }
  }

  // EDIT ASSET
  const handleEditAsset = async (e, formData) => {
    e.preventDefault()
    await updatePortfolioAsset(asset.id, formData)
    updateModal(prevModal => ({ ...prevModal, edit: false }))
    triggerReload(prev => !prev)
  }

  // DELETE ASSET
  const handleDeleteAsset = async () => {
    const data = await destroyPortfolioAsset(asset.id)
    if (data) {
      setAssets(prevAssets => (
        prevAssets.filter(a => a.id !== asset.id)
      ))
      updateModal(prevModal => ({ ...prevModal, edit: false }))
    }
  }

  return (
    <Layout
      updateModal={updateModal}
      handleLogout={props.handleLogout}
    >
      <Route exact path="/" component={Home}/>
      <Route exact path="/portfolios/:id">
        <Port
          portfolios={portfolios}
          updateModal={updateModal}
          setAsset={setAsset}
          setAssets={setAssets}
          assets={assets}
          reload={reload}
          />
      </Route>
      
      {modal.asset && <AddAsset
        updateModal={updateModal}
        portfolios={portfolios}
        handleAddAsset={handleAddAsset}
      />}
      {modal.ports && <Ports
        updateModal={updateModal}
        portfolios={portfolios}
        handleEditPort={handleEditPort}
        updateMsgModal={updateMsgModal}
        />}
      {modal.edit && <EditAsset
        updateModal={updateModal}
        portfolios={portfolios}
        asset={asset}
        handleEditAsset={handleEditAsset}
        handleDeleteAsset={handleDeleteAsset}
        />}
      {modal.signin && <SignIn
        updateModal={updateModal}
        handleLogin={props.handleLogin}
      />}
      {modal.createanaccount && <SignUp
        updateModal={updateModal}
        handleRegister={props.handleRegister}
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
