import React from 'react'
import { NavbarItemProps } from '../../types/props'

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
          ? 'bg-bg-primary text-text-tertiary'
          : 'text-text-tertiary hover:bg-secondary hover:text-primary'
      }`}
    >
      {children}
    </a>
  )
}
