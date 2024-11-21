import React, { useState, useEffect } from 'react'
import { ChefHat } from 'lucide-react'
import { Country, CreateRecipeRequest, CreateStep } from '../types/model'
import countryService from '../services/countryService'
import { Button } from '../components/Button'
import RecipeForm from '../components/RecipeForm'
import StepsForm from '../components/Form/StepsForm'
import recipeService from '../services/recipeService'
import stepsService from '../services/stepsService'
import { useNavigate } from 'react-router-dom'

const CreateRecipePage: React.FC = () => {
  const [step, setStep] = useState<'recipe' | 'steps'>('recipe')
  const [countries, setCountries] = useState<Country[]>([])
  const [recipeData, setRecipeData] = useState<CreateRecipeRequest | null>(null)
  const [steps, setSteps] = useState<CreateStep[]>([])

  const navigate = useNavigate()

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

  const handleRecipeFormSuccess = (recipe: CreateRecipeRequest) => {
    setRecipeData(recipe)
    setStep('steps')
  }

  const handleStepsFormSuccess = async (Steps: CreateStep[]) => {
    setSteps(Steps)
    if (!recipeData) {
      console.error('Recipe data is missing')
      return
    }

    try {
      const recipe = await recipeService.createRecipe(recipeData)
      const response = await stepsService.createSteps({
        recipeId: recipe.id,
        steps,
      })

      if (response) {
        navigate(`/`)
      }
    } catch (error) {
      console.error('Error creating recipe:', error)
    }
  }

  const handleBack = () => {
    setStep('recipe')
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

          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'recipe' ? 'bg-primary text-text-primary' : 'bg-bg-secondary text-text-secondary'}`}
              >
                1
              </div>
              <div
                className={`w-16 h-1 ${step === 'recipe' ? 'bg-primary' : 'bg-bg-secondary'}`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'steps' ? 'bg-primary text-text-primary' : 'bg-bg-secondary text-text-secondary'}`}
              >
                2
              </div>
            </div>
          </div>

          {step === 'recipe' && (
            <RecipeForm
              countries={countries}
              onSuccess={handleRecipeFormSuccess}
            />
          )}

          {step === 'steps' && (
            <>
              <StepsForm onSuccess={handleStepsFormSuccess} />
              <div className="mt-6 flex justify-between">
                <Button onClick={handleBack} variant="outline">
                  Back to Recipe Details
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateRecipePage
