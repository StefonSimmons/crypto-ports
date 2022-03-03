import api from './apiConfig'

export const getAllSymbols = async () => {
  const res = await api.get('/symbols')
  return res.data
}