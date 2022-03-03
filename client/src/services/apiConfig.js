import axios from 'axios'

const baseURL = process.NODE_ENV === 'production' ? 'https://simmports-api.herokuapp.com' : 'http://localhost:3000'


const api = axios.create({
  baseURL: baseURL
})

export default api