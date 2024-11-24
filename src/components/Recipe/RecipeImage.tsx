import React from 'react'
import { useState } from 'react'

const RecipeImage: React.FC<{ src: string }> = ({ src }) => {
  const [imgSrc, setImgSrc] = useState(src)
  const defaultImage = '/recipe.jpeg'

  return (
    <div className="relative">
      <img
        src={imgSrc}
        alt="Recipe"
        className="w-full h-80 object-cover"
        onError={() => setImgSrc(defaultImage)}
      />
    </div>
  )
}

export default RecipeImage
