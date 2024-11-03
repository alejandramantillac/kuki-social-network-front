import axiosInstance from '../config/axiosConfig'
import { User } from '../types/model'
import jwtService from './jwtService'

const API_PATH = 'v1/auth'

type LoginResponse = {
  token: string
}

const register = async (data: {
  username: string
  email: string
  password: string
  fullName: string
  country: string
}): Promise<User | null> => {
  const response = await axiosInstance.post<LoginResponse>(
    API_PATH + '/register',
    data
  )
  if (response.data.token) {
    jwtService.setToken(response.data.token)
  }
  return getUser()
}

const login = async (
  username: string,
  password: string
): Promise<User | null> => {
  const response = await axiosInstance.post<LoginResponse>(
    API_PATH + '/login',
    {
      username,
      password,
    }
  )
  if (response.data.token) {
    jwtService.setToken(response.data.token)
  }
  return getUser()
}

const logout = (): void => {
  jwtService.removeToken()
}

const getUser = (): User | null => {
  const decodedToken = jwtService.getDecodedToken()
  if (!decodedToken) return null
  return {
    username: jwtService.getUsername(decodedToken),
    roles: jwtService.getRoles(decodedToken),
  }
}

export default {
  register,
  login,
  logout,
  getUser,
}
