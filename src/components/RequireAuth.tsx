import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { RequireAuthProps } from '../types/props'

/**
 * RequireAuth component to protect routes that require authentication and specific roles.
 * @param {RequireAuthProps} props - The properties for the RequireAuth component.
 * @param {string} [props.redirectPath='/login'] - The path to redirect to if the user is not authenticated. Defaults to '/login'.
 * @param {string} [props.unAuthorizedPath='/unauthorized'] - The path to redirect to if the user does not have the required roles. Defaults to '/unauthorized'.
 * @param {string[]} [props.roles=[]] - The roles required to access the route. Defaults to an empty array.
 * @returns {JSX.Element} The rendered RequireAuth component.
 */
const RequireAuth: React.FC<RequireAuthProps> = ({
  redirectPath = '/login',
  unAuthorizedPath = '/unauthorized',
  roles = [],
}) => {
  const authContext = useContext(AuthContext)

  if (authContext && !authContext.isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  if (authContext && roles.length > 0) {
    if (!authContext.hasRoles(roles)) {
      return <Navigate to={unAuthorizedPath} replace />
    }
  }

  return <Outlet />
}

export default RequireAuth
