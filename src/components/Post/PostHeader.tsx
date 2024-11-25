import React from 'react'
import { Avatar } from '../Avatar'
import { useNavigate } from 'react-router-dom'

const PostHeader: React.FC<{
  title: string
  author: string
  authorAvatar: string
  id: string
}> = ({ title, author, authorAvatar, id }) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-start mb-2">
      <h2
        className="text-xl font-bold text-text-tertiary cursor-pointer hover:underline"
        onClick={() => navigate('/view-recipe/' + id)}
      >
        {title}
      </h2>
      <div className="flex items-center">
        <span className="text-sm text-text-secondary mr-2">by {author}</span>
        <Avatar src={authorAvatar} alt={author} size="sm" user={author} />
      </div>
    </div>
  )
}

export default PostHeader
