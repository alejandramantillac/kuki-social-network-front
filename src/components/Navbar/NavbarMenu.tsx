import React from 'react'

interface NavbarMenuProps {
  children: React.ReactNode
}

export const NavbarMenu: React.FC<NavbarMenuProps> = ({ children }) => {
  return <div className="flex space-x-4">{children}</div>
}
