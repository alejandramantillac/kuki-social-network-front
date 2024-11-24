import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { SearchBarProps } from '../types/props'
import recipeService from '../services/recipeService'
import { Recipe } from '../types/model'

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
  const [searchResults, setSearchResults] = useState<Recipe[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      if (value) {
        try {
          console.log('Fetching recipes for:', value)
          const results = await recipeService.searchRecipes(value)
          console.log('Fetched recipes:', results)
          setSearchResults(results)
          setError(null) // Clear any previous errors
        } catch (err) {
          console.error('Error fetching recipes:', err)
          setError('Failed to fetch recipes. Please try again later.')
        }
      } else {
        setSearchResults([])
      }
    }

    fetchRecipes()
  }, [value])

  return (
    <div className={`relative ${className}`}>
      <div className="relative w-full rounded-md border border-border-primary shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-md border-none px-3 py-2 pl-10 placeholder-text-secondary focus:outline-none dark:bg-bg-primary dark:text-text-primary"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary dark:text-text-primary">
          <Search className="h-5 w-5" />
        </div>
      </div>
      {error && <div className="text-text-error mt-2">{error}</div>}
      {searchResults.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-bg-primary border border-border-primary rounded-md shadow-lg dark:bg-bg-secondary dark:border-gray-700">
          {searchResults.map((recipe) => (
            <div
              key={recipe.id}
              className="p-2 hover:bg-secondary dark:hover:bg-gray-700"
            >
              {recipe.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
