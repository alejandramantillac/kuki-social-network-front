import { jwtDecode } from 'jwt-decode'

type DecodedToken = {
  id: string
  sub: string
  name: string
  roles: string[]
  exp: number
  photoUrl: string
  avatarUrl: string
}

const TOKEN_KEY = 'jwtToken'

const getValidToken = (): string | null => {
  if (isTokenExpired()) {
    removeToken()
    window.location.reload()
  }
  return getToken()
}

const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

const setToken = (token: string): string => {
  localStorage.setItem(TOKEN_KEY, token)
  return getToken() as string
}

const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

const getDecodedToken = (): DecodedToken | null => {
  const token = getToken()
  if (!token) return null
  try {
    return jwtDecode<DecodedToken>(token)
  } catch (error) {
    console.error('Failed to decode token', error)
    return null
  }
}

const getUsername = (decodedToken: DecodedToken): string => {
  return decodedToken ? decodedToken.sub : ''
}

const getRoles = (decodedToken: DecodedToken): string[] => {
  return decodedToken ? decodedToken.roles : []
}

const getPhotoUrl = (decodedToken: DecodedToken): string => {
  return decodedToken ? decodedToken.photoUrl : ''
}

const isTokenExpired = (): boolean => {
  const decodedToken = getDecodedToken()
  if (!decodedToken) return true
  return decodedToken.exp * 1000 < Date.now()
}

export default {
  getValidToken,
  setToken,
  removeToken,
  getDecodedToken,
  getUsername,
  getRoles,
  getPhotoUrl,
  isTokenExpired,
}
