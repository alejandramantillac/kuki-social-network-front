import React from 'react'
import { NavbarItemProps } from '../../types/types'

export const NavbarItem: React.FC<NavbarItemProps> = ({
  href,
  children,
  active = false,
}) => {
  return (
    <a
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? 'bg-orange-500 text-white'
          : 'text-gray-700 hover:bg-orange-100 hover:text-orange-500'
      }`}
    >
      {children}
    </a>
  )
}
