import React, { useState } from 'react'
import { Dropdown } from '../Dropdown'
import { X } from 'lucide-react'

type TagSelectorProps = {
  tags: string[] // Lista de nombres de tags disponibles.
  selectedTags: string[] // Tags actualmente seleccionados.
  onChange: (tags: string[]) => void // Función para propagar cambios al componente principal.
  error?: string // Mensaje de error para validación.
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
    <div>
      <label
        htmlFor="tags"
        className="block text-sm font-medium text-text-secondary mb-1"
      >
        Tags
      </label>
      <Dropdown
        title="Select Tags"
        name="tags"
        value={selectedTag || ''}
        options={tags.map((tag) => ({ value: tag, label: tag }))}
        onChange={(e) => handleTagSelect(e.target.value)}
        className="w-full"
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
      <div className="mt-2 space-y-2">
        {selectedTags.map((tag) => (
          <div
            key={tag}
            className="flex items-center justify-between bg-bg-secondary p-2 rounded-md"
          >
            <span className="text-text-secondary">{tag}</span>
            <button
              type="button"
              onClick={() => handleTagRemove(tag)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TagSelector
