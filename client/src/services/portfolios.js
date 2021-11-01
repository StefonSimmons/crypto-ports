import api from './apiConfig'

export const getUserPortfolios = async (userID) => {
  const res = await api.get(`/users/${userID}/portfolios`)
  return res.data
}

export const addUserPortfolio = async (portfolio) => {
  const res = await api.post("/portfolios/", { portfolio })
  return res.data
}

export const updateUserPorfolio = async (portID, portfolio) => {
  const res = await api.put(`/portfolios/${portID}`, { portfolio })
  return res.data
}

export const destroyUserPortfolio = async (portID) => {
  const res = await api.delete(`/portfolios/${portID}`)
  return res.data
}