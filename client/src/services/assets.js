import api from './apiConfig'

export const getPortfolioAssets = async (userID, portfolioID) => {
  const res = await api.get(`/users/${userID}/portfolios/${portfolioID}/assets`)
  return res.data
}