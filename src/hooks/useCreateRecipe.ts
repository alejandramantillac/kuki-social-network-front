import { useState } from 'react'
import { CreateRecipeRequest, CreateStep } from '../types/model'
import recipeService from '../services/recipeService'
import stepsService from '../services/stepsService'
import { useNavigate } from 'react-router-dom'

const useCreateRecipe = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [recipeData, setRecipeData] = useState<Partial<CreateRecipeRequest>>({})
  const [steps, setSteps] = useState<CreateStep[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const handleBasicInfoSubmit = (data: Partial<CreateRecipeRequest>) => {
    setRecipeData((prev) => ({ ...prev, ...data }))
    handleNext()
  }

  const handleIngredientsSubmit = (data: {
    ingredients: { id: string; quantity: string; name: string }[]
    tags: string[]
  }) => {
    setRecipeData((prev) => ({
      ...prev,
      ingredients: data.ingredients,
      tags: data.tags,
    }))
    handleNext()
  }

  const handleStepsSubmit = (recipeSteps: CreateStep[]) => {
    setSteps(recipeSteps)
    handleNext()
  }

  const handleFinalSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      const recipe = await recipeService.createRecipe(
        recipeData as CreateRecipeRequest
      )
      await stepsService.createSteps({
        recipeId: recipe.id,
        steps,
      })
      navigate('/')
    } catch (error) {
      console.error('Error creating recipe:', error)
      setError('Failed to create recipe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return {
    currentStep,
    setCurrentStep,
    recipeData,
    steps,
    loading,
    error,
    setError,
    handleNext,
    handleBasicInfoSubmit,
    handleIngredientsSubmit,
    handleStepsSubmit,
    handleFinalSubmit,
  }
}

export default useCreateRecipe
