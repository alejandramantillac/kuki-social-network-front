import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

type RequireAdminProps = {
  children: React.ReactNode
}

const RequireAdmin: React.FC<RequireAdminProps> = ({ children }) => {
  const authContext = useContext(AuthContext)

  if (!authContext || !authContext.hasRoles(['ROLE_ADMIN'])) {
    return null
  }

  return <>{children}</>
}

export default RequireAdmin
