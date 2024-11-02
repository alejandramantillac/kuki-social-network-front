import React, { createContext, ReactNode } from 'react'
import authService from '../services/authService'
import { User } from '../types/model'

type AuthContextProps = {
  hasRoles(roles: string[]): boolean
  isAuthenticated: boolean
  currentUser: User | null
  login: (username: string, password: string) => Promise<User | null>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const login = async (username: string, password: string) => {
    const user = await authService.login(username, password)
    return user
  }

  const logout = () => {
    authService.logout()
  }

  const isAuthenticated = !!authService.getUser()

  const hasRoles = (roles: string[]) => {
    if (!authService.getUser()) return false
    return roles.some((role) => authService.getUser()?.roles.includes(role))
  }

  const currentUser = authService.getUser()

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, isAuthenticated, hasRoles }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
