import React from 'react'
import { Avatar } from '../Avatar'

const PostHeader: React.FC<{
  title: string
  author: string
  authorAvatar: string
}> = ({ title, author, authorAvatar }) => {
  return (
    <div className="flex justify-between items-start mb-2">
      <h2 className="text-xl font-bold text-text-tertiary">{title}</h2>
      <div className="flex items-center">
        <span className="text-sm text-text-secondary mr-2">by {author}</span>
        <Avatar src={authorAvatar} alt={author} size="sm" />
      </div>
    </div>
  )
}

export default PostHeader
