import React from 'react'
import { CreateRecipeRequest, CreateStep } from '../../types/model'
import { Button } from '../Button'
import { Card } from '../Card'
import { Spinner } from '../Spinner'

interface FinalReviewProps {
  recipeData: Partial<CreateRecipeRequest>
  steps: CreateStep[]
  onSubmit: () => void
  loading: boolean
}

const FinalReview: React.FC<FinalReviewProps> = ({
  recipeData,
  steps,
  onSubmit,
  loading,
}) => {
  return (
    <div className="space-y-6 mt-3">
      <Card
        title=""
        description=""
        imageUrl={recipeData.image ? URL.createObjectURL(recipeData.image) : ''}
      >
        <h2 className="text-2xl font-bold text-text-tertiary">
          Recipe details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
          <div className="space-y-1">
            <p className="text-text-secondary">
              <strong>Title:</strong> {recipeData.title}
            </p>
            <p className="text-text-secondary">
              <strong>Difficulty:</strong> {recipeData.difficulty}
            </p>
            <p className="text-text-secondary">
              <strong>Country:</strong> {recipeData.country}
            </p>
            <p className="text-text-secondary">
              <strong>Description:</strong> {recipeData.description}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-text-secondary">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {recipeData.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-bg-secondary text-text-secondary px-2 py-1 rounded-md text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-lg font-medium text-text-secondary mt-4">
              Ingredients
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {recipeData.ingredients?.map((ingredient, index) => (
                <li key={index} className="text-sm text-text-secondary">
                  {ingredient.quantity} of {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <Card title="Steps" description="">
        <ol className="list-decimal pl-5 space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="text-sm text-text-secondary">
              <p>{`${step.description} - ${step.estimatedTime} minutes`}</p>
              {step.multimedia && (
                <img
                  src={URL.createObjectURL(step.multimedia)}
                  alt={`Step ${step.stepNumber}`}
                  className="mt-2 max-w-xs rounded-md"
                />
              )}
            </li>
          ))}
        </ol>
      </Card>

      <Button onClick={onSubmit} disabled={loading} className="w-full">
        {loading ? <Spinner size="sm" /> : null}
        {loading ? 'Creating Recipe...' : 'Create Recipe'}
      </Button>
    </div>
  )
}

export default FinalReview
