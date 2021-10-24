import api from './apiConfig'

export const getUserPortfolios = async (userID) => {
  const res = await api.get(`/users/${userID}/portfolios`)
  return res.data
}

export const updateUserPorfolio = async (portID, portData) => {
  const res = await api.put(`/portfolios/${portID}`, { portfolio: portData })
  return res.data
}

export const destroyUserPortfolio = async (portID) => {
  await api.delete(`/portfolios/${portID}`)
}