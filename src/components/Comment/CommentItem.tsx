import React from 'react'
import { Comment } from '../../types/model'
import { Avatar } from '../Avatar'

type CommentItemProps = {
  comment: Comment
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="bg-bg-secondary rounded-lg p-3 shadow-md">
      <div className="flex justify-between items-start mb-2">
        <div className="flex cursor-pointer">
          <Avatar
            src={comment.user.photoUrl}
            alt={comment.user.username}
            size="sm"
          />
          <span className="font-medium text-text-tertiary ml-1">
            {comment.user.username}
          </span>
        </div>
        <span className="text-xs text-text-secondary">
          {new Date(comment.creationDate).toLocaleString()}
        </span>
      </div>
      <p className="text-text-secondary">{comment.content}</p>
    </div>
  )
}

export default CommentItem
