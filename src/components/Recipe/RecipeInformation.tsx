import React from 'react'
import { Recipe, RecipeDifficulty } from '../../types/model'
import { formatDuration } from '../../utils/timeUtils'
import { Clock, Globe } from 'lucide-react'

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
      {recipe && (
        <>
          <div className="">
            <h1 className="text-4xl font-bold mb-5 font-size-21">
              {recipe.title}
            </h1>
            <span
              className={`absolute top-4 left-4 text-sm bg-tertiary px-2 py-1 rounded-full ${getColor(recipe.difficulty) || 'BASIC'}`}
            >
              {recipe.difficulty}
            </span>
            <div className="flex items-center mb-4">
              <Clock className="w-4 h-4 mr-1" />
              <span className="mr-4">
                {formatDuration(recipe.estimatedTime!)}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <Globe className="w-4 h-4 mr-1" />
              <span>{recipe.country.name}</span>
            </div>
            <p>
              <b>Description:</b> <br />
              {recipe.description}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default RecipeInformation
