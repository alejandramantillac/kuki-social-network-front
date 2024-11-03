import React, { createContext, ReactNode } from 'react'
import authService from '../services/authService'
import { User } from '../types/model'

type AuthContextProps = {
  hasRoles(roles: string[]): boolean
  isAuthenticated: boolean
  currentUser: User | null
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const isAuthenticated = !!authService.getUser()

  const hasRoles = (roles: string[]) => {
    if (!authService.getUser()) return false
    return roles.some((role) => authService.getUser()?.roles.includes(role))
  }

  const currentUser = authService.getUser()

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        hasRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
