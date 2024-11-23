import axiosInstance from '../config/axiosConfig'
import { AuthUser } from '../types/model'
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
}): Promise<AuthUser | null> => {
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
): Promise<AuthUser | null> => {
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
  window.location.reload()
}

const getUser = (): AuthUser | null => {
  const decodedToken = jwtService.getDecodedToken()
  if (!decodedToken) return null
  return {
    id: decodedToken.id,
    username: jwtService.getUsername(decodedToken),
    name: decodedToken.name,
    roles: jwtService.getRoles(decodedToken),
    photoUrl: jwtService.getPhotoUrl(decodedToken),
    avatarUrl: decodedToken.avatarUrl,
  }
}

export default {
  register,
  login,
  logout,
  getUser,
}
