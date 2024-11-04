import React from 'react'

const PostDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  return <p className="p-4 text-text-secondary">{description}</p>
}

export default PostDescription
