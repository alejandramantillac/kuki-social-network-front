import React, { useState, useEffect, useRef } from 'react'
import { DropdownProps } from '../types/props'

//Full descriptive comment
/**
 * Dropdown component to display a dropdown.
 * @param {DropdownProps} props - The props of the component.
 * @param {string} props.title - The title of the dropdown.
 * @param {Array<{ label: string, value: string }>} props.options - The options of the dropdown.
 * @param {boolean} [props.showSearch=false] - Whether to show the search input.
 * @param {string} [props.className] - The class name of the dropdown.
 * @param {string} props.name - The name of the dropdown.
 * @param {string} props.value - The value of the dropdown.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - The change event handler of the dropdown.
 * @param {string} [props.errors] - The errors of the dropdown.
 * @returns {JSX.Element} The rendered Dropdown component.
 */
export const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  showSearch = false,
  className,
  name,
  value,
  onChange,
  errors,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>(
    'bottom'
  )
  const [dropdownAlign, setDropdownAlign] = useState<'left' | 'right'>('left')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSelect = (event: React.MouseEvent, value: string) => {
    event.preventDefault()
    onChange({
      target: { name, value },
    } as React.ChangeEvent<HTMLInputElement>)
    setIsOpen(false)
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const viewportWidth = window.innerWidth

      if (dropdownRect.bottom + 200 > viewportHeight) {
        setDropdownPosition('top')
      } else {
        setDropdownPosition('bottom')
      }

      if (dropdownRect.left + 200 > viewportWidth) {
        setDropdownAlign('right')
      } else {
        setDropdownAlign('left')
      }
    }
  }, [isOpen])

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
    >
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(!isOpen)
        }}
        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium text-text-secondary hover:bg-secondary hover:text-primary ${className}`}
        aria-label={title}
      >
        {value && value !== ''
          ? options.find((option) => option.value === value)?.label
          : title}
      </button>
      {isOpen && (
        <div
          className={`absolute ${
            dropdownPosition === 'top' ? 'bottom-12' : 'mt-2'
          } ${dropdownAlign === 'right' ? 'right-0' : 'left-0'} w-48 rounded-md shadow-lg bg-bg-primary z-10 max-h-60 overflow-y-auto ${className}`}
        >
          {showSearch && (
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`px-4 py-2 text-sm text-text-secondary bg-bg-primary border-b border-gray-300 focus:outline-none ${className}`}
            />
          )}
          <div className="py-1 flex flex-col" role="menu">
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                onClick={(e) => handleSelect(e, option.value)}
                className={`px-4 py-2 text-sm text-text-secondary hover:bg-secondary hover:text-primary ${
                  value === option.value ? 'bg-secondary text-primary' : ''
                }`}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {errors && <span className="text-red-500 text-sm">{errors}</span>}
    </div>
  )
}
