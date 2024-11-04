import React from 'react'
import { Badge } from '../Badge'

const PostFooter: React.FC<{ comments: number; likes: number }> = ({
  comments,
  likes,
}) => {
  return (
    <div className="p-4 border-t border-border-primary flex justify-between">
      <Badge text={`${comments} comments`} color="gray" />
      <Badge text={`${likes} likes`} color="gray" />
    </div>
  )
}

export default PostFooter
