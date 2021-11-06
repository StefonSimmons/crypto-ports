import api from './apiConfig'


export const register = async (userData) => {
  const res = await api.post('/users', { user: userData })
  const {token, user} = res.data 
  if (token) {
    localStorage.setItem('authToken', token)
  }
  return user
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