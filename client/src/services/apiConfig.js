import axios from 'axios'

const baseURL = process.NODE_ENV === 'production' ? 'prod url' : 'http://localhost:3000'


const api = axios.create({
  baseURL: baseURL
})

export default api