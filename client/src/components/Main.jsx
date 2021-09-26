import { useState } from 'react'
import Layout from '../layout/Layout'
import AddAsset from '../modals/AddAsset'
import Home from '../screens/Home'

export default function Main() {
  const [assetModal, updateAssetModal] = useState(true)

  return (
    <Layout >
      <Home updateAssetModal={updateAssetModal} />
      {assetModal && <AddAsset />}
    </Layout>
  )
}
