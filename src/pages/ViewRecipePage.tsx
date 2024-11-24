import React from 'react'
import { useState, useEffect } from 'react'
import RecipeBody from '../components/Recipe/RecipeBody'
import recipeService from '../services/recipeService'
import { Recipe } from '../types/model'
import { Spinner } from '../components/Spinner'

const ViewRecipePage: React.FC<{
  id: string
}> = ({ id }) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const fetchRecipe = async () => {
        const recipe = await recipeService.getRecipe(id)
        setRecipe(recipe)
      }
      fetchRecipe()
    } catch (error) {
      console.error('Error fetching recipe:', error)
    } finally {
      setLoading(false)
    }
  }, [id])

  return (
    <div className="container mx-auto px-4">
      {loading ? (
        <div className="flex justify-center items-center h-100">
          <Spinner size="md" />
        </div>
      ) : (
        <RecipeBody recipe={recipe} />
      )}
    </div>
  )
}

export default ViewRecipePage
