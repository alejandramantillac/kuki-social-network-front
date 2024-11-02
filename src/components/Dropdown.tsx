import React, { useState } from 'react'
import { DropdownProps } from '../types/types'

/**
 * Dropdown component to display a dropdown menu with a title and children.
 * @param {DropdownProps} props - The properties for the Dropdown component.
 * @param {string} props.title - The title of the dropdown button.
 * @param {React.ReactNode} props.children - The content to display inside the dropdown menu.
 * @returns {JSX.Element} The rendered Dropdown component.
 */
export const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-orange-100 hover:text-orange-500"
      >
        {title}
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div
            className="py-1 flex flex-col"
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
