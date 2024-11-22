import React, { useState } from 'react'
import { Dropdown } from '../Dropdown'
import { X } from 'lucide-react'
import { Button } from '../Button'

type TagSelectorProps = {
  tags: string[]
  selectedTags: string[]
  onChange: (tags: string[]) => void
  error?: string
}

const TagSelector: React.FC<TagSelectorProps> = ({
  tags,
  selectedTags,
  onChange,
  error,
}) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const updatedTags = [...selectedTags, tag]
      onChange(updatedTags)
      setSelectedTag(null)
    }
  }

  const handleTagRemove = (tag: string) => {
    const updatedTags = selectedTags.filter((t) => t !== tag)
    onChange(updatedTags)
  }

  return (
    <div className="space-y-4">
      <div>
        <Dropdown
          title="Select Tags"
          name="tags"
          value={selectedTag || ''}
          options={tags.map((tag) => ({ value: tag, label: tag }))}
          onChange={(e) => handleTagSelect(e.target.value)}
          className="w-full"
        />
        {error && (
          <span className="text-red-500 text-sm mt-1 block">{error}</span>
        )}
      </div>
      <div className="space-y-2">
        {selectedTags.map((tag) => (
          <div
            key={tag}
            className="flex items-center justify-between bg-bg-secondary p-2 rounded-md"
          >
            <span className="text-text-secondary">{tag}</span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleTagRemove(tag)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagSelector
