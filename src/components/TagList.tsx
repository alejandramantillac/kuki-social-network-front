import React from 'react'
import { TagListProps } from '../types/props'

/**
 * TagList component to display a list of trending tags.
 * @param {TagListProps} props - The properties for the TagList component.
 * @param {Tag[]} props.tags - The array of tags to display.
 * @returns {JSX.Element} The rendered TagList component.
 */
const TagList: React.FC<TagListProps> = ({ tags }) => {
  if (!Array.isArray(tags)) {
    return <div>No tags available</div>
  }

  return (
    <div className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
      {tags.slice(0, 5).map((tag) => (
        <div
          key={tag.tagName}
          className="flex flex-col border-b border-gray-200 pb-3"
        >
          <span className="text-xs text-gray-500">
            Tendencia en {tag.country}
          </span>
          <span className="font-semibold text-sm text-black">
            {tag.tagName}
          </span>
          <span className="text-xs text-gray-400">
            {tag.usageCount} publicaciones
          </span>
        </div>
      ))}
    </div>
  )
}

export default TagList
