import React from 'react'
import { ChefHat } from 'lucide-react'

interface NavbarBrandProps {
  title: string
}

export const NavbarBrand: React.FC<NavbarBrandProps> = ({ title }) => {
  return (
    <div className="flex flex-shrink-0 items-center">
      <ChefHat className="h-8 w-8 text-orange-500" />
      <span className="ml-2 text-xl font-bold text-gray-800">{title}</span>
    </div>
  )
}
