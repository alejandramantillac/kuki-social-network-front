import React from 'react'

const PostDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  return <p className="text-text-secondary mb-4 line-clamp-2">{description}</p>
}

export default PostDescription
