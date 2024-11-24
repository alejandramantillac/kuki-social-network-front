import React from 'react'
import { RecipeDifficulty } from '../../types/model'

const PostDifficulty: React.FC<{ difficulty: RecipeDifficulty }> = ({
  difficulty,
}) => {
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
    <span
      className={`absolute top-4 left-4 text-sm bg-tertiary px-2 py-1 rounded-full ${getColor(difficulty)}`}
    >
      {difficulty}
    </span>
  )
}

export default PostDifficulty
