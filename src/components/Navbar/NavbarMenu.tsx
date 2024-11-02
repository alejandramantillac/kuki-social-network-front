import React from 'react'
import { NavbarMenuProps } from '../../types/props'

export const NavbarMenu: React.FC<NavbarMenuProps> = ({ children }) => {
  return <div className="flex space-x-4">{children}</div>
}
