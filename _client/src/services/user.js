import api from './apiConfig'


export const register = async (userData) => {
  const res = await api.post('/users', { user: userData })
  const {token, user} = res.data 
  if (token) {
    localStorage.setItem('authToken', token)
    return user
  }
}

export const login = async (userData) => {
  try {
    const res = await api.post('/users/login', { user: userData })
    const { token, user } = res.data
    if (token) {
      localStorage.setItem('authToken', token)
      return user
    }
  } catch (error) {
    return error
  }
}

export const verify = async () => {
  const token = localStorage.getItem('authToken')
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const res = await api.get('/users/verify')
    return res.data
  }
}

export const logout = () => {
  localStorage.removeItem('authToken')
  return 'logged out'
}