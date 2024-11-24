import React from 'react'
import { Recipe } from '../../types/model'
import RecipeImage from './RecipeImage'
import RecipeInformation from './RecipeInformation'

const RecipeBody: React.FC<{
  recipe: Recipe | null
}> = ({ recipe }) => {
  return (
    <div className="">
      <RecipeImage src={recipe?.photoUrl || ''} />
      <RecipeInformation recipe={recipe} />
    </div>
  )
}

export default RecipeBody
