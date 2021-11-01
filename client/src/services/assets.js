import api from './apiConfig'

export const getPortfolioAssets = async (userID, portfolioID) => {
  const res = await api.get(`/users/${userID}/portfolios/${portfolioID}/assets`)
  return res.data
}

export const addPortfolioAsset = async (asset) => {
  const res = await api.post(`/assets/`, { asset })
  return res.data
}

export const updatePortfolioAsset = async (assetID, asset) => {
  const res = await api.put(`/assets/${assetID}`, { asset })
  return res.data
}

export const destroyPortfolioAsset = async (assetID) => {
  const res = await api.delete(`/assets/${assetID}`)
  return res.data
}