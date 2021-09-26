import api from './apiConfig'

export const getUserPortfolios = async (userID) => {
  const res = await api.get(`/users/${userID}/portfolios`)
  return res.data
}