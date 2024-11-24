import React from 'react'
import { Recipe, RecipeDifficulty } from '../../types/model'

const RecipeInformation: React.FC<{
  recipe: Recipe | null
}> = ({ recipe }) => {
  const getColor = (difficulty: RecipeDifficulty) => {
    switch (difficulty) {
      case 'ADVANCED':
        return 'text-red-500'
      case 'INTERMEDIATE':
        return 'text-yellow-500'
      case 'BASIC':
        return 'text-green-500'
      default:
        return 'text-text-secondary'
    }
  }

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-text-primary">{recipe?.title}</h1>
      {recipe && (
        <>
          <span
            className={`absolute top-4 left-4 text-sm bg-tertiary px-2 py-1 rounded-full ${getColor(recipe.difficulty) || 'BASIC'}`}
          >
            {recipe.difficulty}
          </span>
          <p className="text-text-secondary">{recipe.estimatedTime}</p>
          <p className="text-text-secondary">{recipe.description}</p>
        </>
      )}
    </div>
  )
}

export default RecipeInformation
