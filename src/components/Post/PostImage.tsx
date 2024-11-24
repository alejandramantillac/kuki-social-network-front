import { Bookmark } from 'lucide-react'
import React, { useState } from 'react'
import PostDifficulty from './PostDifficulty'
import { RecipeDifficulty } from '../../types/model'

const PostImage: React.FC<{
  src: string
  userSaved?: boolean
  difficulty: RecipeDifficulty
}> = ({ src, userSaved, difficulty }) => {
  const [imgSrc, setImgSrc] = useState(src)
  const defaultImage = '/recipe.jpeg'

  return (
    <div className="relative">
      <PostDifficulty difficulty={difficulty} />
      <div className="absolute top-4 right-4 bg-bg-primary rounded-full p-2 shadow-md">
        <button className="flex items-center">
          <Bookmark
            className={`w-6 h-6 ${userSaved ? 'text-primary fill-current' : 'text-text-secondary'}`}
          />
        </button>
      </div>
      <img
        src={imgSrc}
        alt="Post"
        className="w-full h-64 object-cover"
        onError={() => setImgSrc(defaultImage)}
      />
    </div>
  )
}

export default PostImage
