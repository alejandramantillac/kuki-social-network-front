import React from 'react'

const PostHeader: React.FC<{ title: string; author: string }> = ({
  title,
  author,
}) => {
  return (
    <div className="p-4 border-b border-border-primary">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-text-secondary">by {author}</p>
    </div>
  )
}

export default PostHeader
