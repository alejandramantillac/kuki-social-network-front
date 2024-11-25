import React, { useState } from 'react'
import { Recipe } from '../../types/model'
import RecipeImage from './RecipeImage'
import RecipeInformation from './RecipeInformation'
import { Card } from '../Card'
import { Button } from '../Button'
import { StepModal } from '../StepModal/StepModal'

const RecipeBody: React.FC<{
  recipe: Recipe | null
}> = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card title="" description="">
      <RecipeImage src={recipe?.photoUrl || ''} />
      <RecipeInformation recipe={recipe} />
      <Button className="max-w-48 h-11" onClick={() => setIsOpen(true)}>
        View Steps
      </Button>

      {recipe && recipe.id && (
        <StepModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          id={recipe.id}
        />
      )}
    </Card>
  )
}

export default RecipeBody
