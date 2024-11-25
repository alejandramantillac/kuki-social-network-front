import { Bookmark } from 'lucide-react'
import React, { useState } from 'react'
import PostDifficulty from './PostDifficulty'
import { RecipeDifficulty } from '../../types/model'
import postService from '../../services/postService'

const PostImage: React.FC<{
  postId: string
  src: string
  userSaved?: boolean
  difficulty: RecipeDifficulty
}> = ({ postId, src, userSaved, difficulty }) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [saved, setUserSaved] = useState(userSaved)
  const defaultImage = 'https://i.ibb.co/Kqvy0x2/recipe.jpg'

  const handleSaveToggle = async () => {
    if (saved) {
      await postService.unsavePost(postId)
    } else {
      await postService.savePost(postId)
    }

    setUserSaved(!saved)
  }

  return (
    <div className="relative">
      <PostDifficulty difficulty={difficulty} />
      <div className="absolute top-4 right-4 bg-bg-primary rounded-full p-2 shadow-md">
        <button
          className="flex items-center"
          onClick={() => handleSaveToggle()}
        >
          <Bookmark
            className={`w-6 h-6 ${saved ? 'text-primary fill-current' : 'text-text-secondary'}`}
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
