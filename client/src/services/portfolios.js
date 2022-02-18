import api from './apiConfig'

export const getUserPortfolios = async (userID) => {
  const token = localStorage.getItem('authToken')
  api.defaults.headers.common.authorization = `Bearer ${token}`
  try {
    const res = await api.get(`/users/${userID}/portfolios`)
    return res.data
  } catch (error) {
    return error
  }
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