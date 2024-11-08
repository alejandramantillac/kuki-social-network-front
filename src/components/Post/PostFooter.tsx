import React, { useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'
import CommentSection from '../Comment/CommentSection'

const PostFooter: React.FC<{
  likes?: number
  comments?: number
  userLiked?: boolean
  postId: string
}> = ({ likes, comments, userLiked, postId }) => {
  const [showComments, setShowComments] = useState(false)

  const handleToggleComments = () => {
    setShowComments(!showComments)
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center text-text-secondary">
        <div className="flex items-center">
          <button className="flex items-center">
            <Heart
              className={`w-5 h-5 mr-1 ${userLiked ? 'text-primary fill-current' : ''}`}
            />
            <span className="mr-4">{likes || 0}</span>
          </button>
          <button className="flex items-center" onClick={handleToggleComments}>
            <MessageCircle className="w-5 h-5 mr-1" />
            <span>{comments || 0}</span>
          </button>
        </div>
      </div>
      {showComments && (
        <CommentSection postId={postId} onClose={handleToggleComments} />
      )}
    </div>
  )
}

export default PostFooter
