import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { NavbarDropdownProps } from '../../types/props'

export const NavbarDropdown: React.FC<NavbarDropdownProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-text-tertiary hover:bg-secondary hover:text-primary"
      >
        {title}
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-bg-primary ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
