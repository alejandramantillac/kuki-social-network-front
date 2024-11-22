import React, { useState, useEffect } from 'react'
import { Card } from '../components/Card'
import { Tabs } from '../components/Tabs'
import { CreateRecipeRequest, Country, CreateStep } from '../types/model'
import countryService from '../services/countryService'
import BasicInfoForm from '../components/Creation/BasicInfoForm'
import FinalReview from '../components/Creation/FinalReview'
import IngredientsForm from '../components/Creation/IngredientsForm'
import StepsForm from '../components/Creation/StepsForm'
import recipeService from '../services/recipeService'
import stepsService from '../services/stepsService'
import { useNavigate } from 'react-router-dom'

const CreateRecipePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [countries, setCountries] = useState<Country[]>([])
  const [recipeData, setRecipeData] = useState<Partial<CreateRecipeRequest>>({})
  const [steps, setSteps] = useState<CreateStep[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await countryService.getCountries()
        setCountries(response)
      } catch (error) {
        console.error('Error fetching countries:', error)
        setError('Failed to fetch countries. Please try again.')
      }
    }

    fetchCountries()
  }, [])

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

  const tabs = [
    {
      label: 'Basic Info',
      content: (
        <BasicInfoForm
          onSubmit={handleBasicInfoSubmit}
          countries={countries}
          initialData={recipeData}
        />
      ),
    },
    {
      label: 'Ingredients',
      content: (
        <IngredientsForm
          onSubmit={handleIngredientsSubmit}
          initialTags={recipeData.tags || []}
          initialIngredients={recipeData.ingredients || []}
        />
      ),
    },
    {
      label: 'Steps',
      content: <StepsForm onSubmit={handleStepsSubmit} initialSteps={steps} />,
    },
    {
      label: 'Review',
      content: (
        <FinalReview
          recipeData={recipeData}
          steps={steps}
          onSubmit={handleFinalSubmit}
          loading={loading}
        />
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-secondary to-bg-primary p-4 sm:p-6 lg:p-8">
      <Card
        title="Create Your Recipe"
        description={`Step ${currentStep + 1} of ${tabs.length}`}
        imageUrl="/create_recipe.jpg"
      >
        <div className="space-y-6">
          <Tabs
            tabs={tabs.map((tab, index) => ({
              ...tab,
              onClick: () => setCurrentStep(index),
              disabled: index > currentStep,
            }))}
            activeTab={currentStep}
          />

          {error && <p className="text-text-error mt-4">{error}</p>}
        </div>
      </Card>
    </div>
  )
}

export default CreateRecipePage
