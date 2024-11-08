import React from 'react'
import { Tag } from '../../types/model'

const PostTags: React.FC<{ tags?: Tag[] }> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tags &&
        tags.map((tag: Tag) => (
          <span
            key={tag.id}
            className="bg-secondary text-text-secondary text-xs px-2 py-1 rounded-full"
          >
            #{tag.name}
          </span>
        ))}
    </div>
  )
}

export default PostTags
