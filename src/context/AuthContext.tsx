import React, { createContext, ReactNode } from 'react'
import authService from '../services/authService'
import { AuthUser } from '../types/model'

type AuthContextProps = {
  hasRoles(roles: string[]): boolean
  isAuthenticated: boolean
  currentUser: AuthUser | null
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const currentUser = authService.getUser()
  const isAuthenticated = !!currentUser

  const hasRoles = (roles: string[]) => {
    if (!currentUser || !currentUser.roles) return false
    return roles.some((role) => currentUser.roles.includes(role))
  }

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
