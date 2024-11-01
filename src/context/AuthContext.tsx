import React, { createContext, ReactNode, useEffect, useState } from 'react'
import authService from '../services/authService'
import { User } from '../types'

interface AuthContextProps {
  hasRoles(roles: string[]): boolean
  isAuthenticated: boolean
  currentUser: User | null
  login: (username: string, password: string) => Promise<User | null>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    authService.getUser()
  )

  useEffect(() => {
    const user = authService.getUser()
    if (user) {
      setCurrentUser(user)
    }
  }, [])

  const login = async (username: string, password: string) => {
    const user = await authService.login(username, password)
    setCurrentUser(user)
    return user
  }

  const logout = () => {
    authService.logout()
    setCurrentUser(null)
  }

  const isAuthenticated = !!currentUser

  const hasRoles = (roles: string[]) => {
    if (!currentUser) return false
    return roles.some((role) => currentUser.roles.includes(role))
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, isAuthenticated, hasRoles }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
