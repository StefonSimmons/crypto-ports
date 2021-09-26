import { useState } from 'react'
import Layout from '../layout/Layout'
import AddAsset from '../modals/AddAsset'
import Ports from '../modals/Ports'
import Home from '../screens/Home'

export default function Main() {
  const [modal, updateModal] = useState({
    asset: false,
    port: false
  })

  return (
    <Layout
      updateModal={updateModal}
    >
      <Home />
      {modal.asset && <AddAsset updateModal={updateModal} />}
      {modal.port && <Ports updateModal={updateModal} />}
    </Layout>
  )
}
