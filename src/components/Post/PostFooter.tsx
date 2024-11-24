import React, { useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import CommentSection from '../Comment/CommentSection'
import postService from '../../services/postService'

const PostFooter: React.FC<{
  likes?: number
  comments?: number
  userLiked?: boolean
  postId: string
}> = ({ likes, comments, userLiked, postId }) => {
  const [showComments, setShowComments] = useState(false)
  const [liked, setLiked] = useState(userLiked)
  const [likeCount, setLikeCount] = useState(likes || 0)

  const handleToggleComments = () => {
    setShowComments(!showComments)
  }

  const handleLike = async () => {
    try {
      if (liked) {
        await postService.unlikeRecipe(postId)
        setLiked(false)
        setLikeCount(likeCount - 1)
      } else {
        await postService.likeRecipe(postId)
        setLiked(true)
        setLikeCount(likeCount + 1)
      }
    } catch (error) {
      console.error('Error liking/unliking the recipe:', error)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center text-text-secondary">
        <div className="flex items-center">
          <button className="flex items-center" onClick={handleLike}>
            <motion.div
              animate={{ scale: liked ? 1.2 : 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Heart
                className={`w-5 h-5 mr-1 ${liked ? 'text-primary fill-current' : ''}`}
              />
            </motion.div>
            <span className="mr-4">{likeCount}</span>
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
