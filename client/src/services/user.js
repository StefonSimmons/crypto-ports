import api from './apiConfig'


export const register = async (user) => {
  const res = await api.post('/users', { user })
  console.log(res.data)
  return res.data
}

export const login = async (user) => {
  const res = await api.post('/users/login', { user })
  return res.data
}

export const verify = async () => {
  const res = await api.get('/users/verify')
  return res.data
}

export const logout = () => {
  return 'logged out'
}