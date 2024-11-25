// src/pages/CreateRecipePage.tsx
import React from 'react'
import { Card } from '../components/Card'
import { Tabs } from '../components/Tabs'
import BasicInfoForm from '../components/Creation/BasicInfoForm'
import FinalReview from '../components/Creation/FinalReview'
import IngredientsForm from '../components/Creation/IngredientsForm'
import StepsForm from '../components/Creation/StepsForm'
import useCreateRecipe from '../hooks/useCreateRecipe'

const CreateRecipePage: React.FC = () => {
  const {
    currentStep,
    recipeData,
    steps,
    loading,
    error,
    setError,
    setCurrentStep,
    handleBasicInfoSubmit,
    handleIngredientsSubmit,
    handleStepsSubmit,
    handleFinalSubmit,
  } = useCreateRecipe()

  const tabs = [
    {
      label: 'Basic Info',
      content: (
        <BasicInfoForm
          onSubmit={handleBasicInfoSubmit}
          initialData={recipeData}
          setError={(message) => error && setError(message)}
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
