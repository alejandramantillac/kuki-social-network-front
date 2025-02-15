import axios from 'axios'
import jwtService from '../services/jwtService'
import config from './envConfig'

const axiosInstance = axios.create({
  baseURL: config.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = jwtService.getValidToken()
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      jwtService.removeToken()
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
