import React from 'react'
import { ChefHat } from 'lucide-react'
import { NavbarBrandProps } from '../../types/props'

export const NavbarBrand: React.FC<NavbarBrandProps> = ({ title }) => {
  return (
    <div className="flex flex-shrink-0 items-center">
      <ChefHat className="h-8 w-8 text-bg-primary" />
      <span className="ml-2 text-xl font-bold text-text-secondary">
        {title}
      </span>
    </div>
  )
}
