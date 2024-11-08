import React from 'react'
import { Heart, MessageCircle } from 'lucide-react'

const PostFooter: React.FC<{
  likes?: number
  comments?: number
  userLiked?: boolean
}> = ({ likes, comments, userLiked }) => {
  return (
    <div className="flex justify-between items-center text-text-secondary">
      <div className="flex items-center">
        <button className="flex items-center">
          <Heart
            className={`w-5 h-5 mr-1 ${userLiked ? 'text-primary fill-current' : ''}`}
          />
          <span className="mr-4">{likes || 0}</span>
        </button>
        <button className="flex items-center">
          <MessageCircle className="w-5 h-5 mr-1" />
          <span>{comments || 0}</span>
        </button>
      </div>
    </div>
  )
}

export default PostFooter
