import React from 'react'
import { Search } from 'lucide-react'
import { SearchBarProps } from '../types/props'

/**
 * SearchBar component to display a search input with an icon.
 * @param {SearchBarProps} props - The properties for the SearchBar component.
 * @param {string} props.value - The current value of the search input.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - The function to call when the input value changes.
 * @param {string} [props.placeholder='Search...'] - The placeholder text for the search input.
 * @param {string} [props.className] - Additional classes to apply to the search input.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-border-primary px-3 py-2 pl-10 placeholder-text-secondary shadow-sm focus:border-color-primary focus:outline-none focus:ring-1 focus:ring-color-primary"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
        <Search className="h-5 w-5" />
      </div>
    </div>
  )
}
