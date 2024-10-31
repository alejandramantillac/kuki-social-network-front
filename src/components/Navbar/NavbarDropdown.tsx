import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface NavbarDropdownProps {
  title: string
  children: React.ReactNode
}

export const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-500"
      >
        {title}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}