import React from 'react'
import { Avatar } from '../Avatar'

type CommentHeaderProps = {
  photoUrl: string
  username: string
  creationDate: string
}

const CommentHeader: React.FC<CommentHeaderProps> = ({
  photoUrl,
  username,
  creationDate,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Avatar src={photoUrl} alt={username} size="sm" user={username} />
        <span className="font-medium text-text-tertiary ml-2">{username}</span>
      </div>
      <span className="text-xs text-text-secondary">
        {new Date(creationDate).toLocaleString()}
      </span>
    </div>
  )
}

export default CommentHeader
