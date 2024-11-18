import React, { useState, useEffect } from 'react'
import RecipeForm from '../components/RecipeForm'
import { Country, CreateRecipeRequest } from '../types/model'
import countryService from '../services/countryService'
import { ChefHat } from 'lucide-react'

const CreateRecipePage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await countryService.getCountries()
        setCountries(response)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    }

    fetchCountries()
  }, [])

  const handleSuccess = (recipe: CreateRecipeRequest) => {
    console.log('Recipe created successfully:', recipe)
    // TODO: Add a toast notification or redirect to the new recipe page
  }

  return (
    <div className="min-h-screen bg-bg-secondary p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-bg-primary rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex items-center justify-center mb-6">
            <ChefHat className="w-10 h-10 text-primary mr-2" />
            <h1 className="text-3xl font-bold text-text-secondary">
              Create Recipe
            </h1>
          </div>
          <RecipeForm countries={countries} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  )
}

export default CreateRecipePage
