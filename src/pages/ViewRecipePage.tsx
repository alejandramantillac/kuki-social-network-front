import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecipeBody from '../components/Recipe/RecipeBody'
import recipeService from '../services/recipeService'
import { Recipe } from '../types/model'
import { Spinner } from '../components/Spinner'
import { StepModal } from '../components/StepModal/StepModal'
import { Button } from '../components/Button'

/**
 * ViewRecipePage component to display the recipe page.
 * This component renders the RecipeBody component with the recipe data.
 *
 * @returns {JSX.Element} The rendered ViewRecipePage component.
 *
 * @example
 * <ViewRecipePage />
 */
const ViewRecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const fetchRecipe = async () => {
        if (id) {
          const recipe = await recipeService.getRecipe(id)
          setRecipe(recipe)
        } else {
          console.error('Recipe ID is undefined')
        }
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
        <>
          <div className="flex flex-col">
            <RecipeBody recipe={recipe} />
            <Button className="max-w-48 h-11" onClick={() => setIsOpen(true)}>
              View Steps
            </Button>
          </div>

          {id && (
            <StepModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              id={id}
            />
          )}
        </>
      )}
    </div>
  )
}

export default ViewRecipePage
