import React, { useState } from 'react'
import { GripVertical, Trash2, ImageIcon, X } from 'lucide-react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { Textarea } from '@headlessui/react'
import { CreateStep } from '../../types/model'
import { Button } from '../Button'

interface NewStepProps {
  step: CreateStep
  index: number
  error: string
  onRemove: () => void
  onUpdateDescription: (description: string) => void
  onUpdateMultimedia: (file: File | null) => void
  provided: DraggableProvided
}

const NewStep: React.FC<NewStepProps> = ({
  step,
  error,
  onRemove,
  onUpdateDescription,
  onUpdateMultimedia,
  provided,
}) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLoading(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
        setLoading(false)
      }
      reader.readAsDataURL(file)
      onUpdateMultimedia(file)
    } else {
      setPreview(null)
      onUpdateMultimedia(null)
    }
  }

  const handleRemoveMedia = () => {
    setPreview(null)
    onUpdateMultimedia(null)
  }

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className="relative p-4 bg-bg-secondary rounded-lg"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div {...provided.dragHandleProps} className="mr-2 cursor-move">
            <GripVertical className="w-5 h-5 text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium text-text-secondary">
            Step {step.stepNumber}
          </h3>
        </div>
        <Button type="button" variant="secondary" size="sm" onClick={onRemove}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <Textarea
        value={step.description}
        onChange={(e) => onUpdateDescription(e.target.value)}
        placeholder={`Describe step ${step.stepNumber}`}
        className={`w-full mb-2 ${error ? 'border-red-500' : ''}`}
        rows={3}
      />
      <div className="flex items-center space-x-2">
        <label
          htmlFor={`file-${step.stepNumber}`}
          className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
        >
          {loading ? (
            <div className="animate-pulse">Loading...</div>
          ) : preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-text-secondary" />
          )}
          <input
            type="file"
            id={`file-${step.stepNumber}`}
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {preview && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemoveMedia}
          >
            <X className="w-4 h-4 mr-2" />
            Remove
          </Button>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default NewStep
