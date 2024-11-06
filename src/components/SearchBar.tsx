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
          const response = await recipeService.searchRecipes(value)
          const results = response.content // Accede a la propiedad content
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
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {searchResults.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {searchResults.map((recipe) => (
            <div key={recipe.id} className="p-2 hover:bg-gray-100">
              {recipe.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
