import React from 'react'
import { GripVertical, Trash2, ImageIcon } from 'lucide-react'
import { Input, Textarea } from '@headlessui/react'
import { Button } from '../Button'
import { CreateStep } from '../../types/model'
import { DraggableProvided } from 'react-beautiful-dnd'

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
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className="relative p-4 bg-bg-secondary rounded-lg"
      style={{
        ...provided.draggableProps.style,
        position: 'relative',
      }}
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
      <div className="flex items-center">
        <Input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => onUpdateMultimedia(e.target.files?.[0] || null)}
          className="hidden"
          id={`file-${step.stepNumber}`}
        />
        <label
          htmlFor={`file-${step.stepNumber}`}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
        >
          <ImageIcon className="w-5 h-5 mr-2" />
          {step.multimedia ? 'Change' : 'Add'} Media
        </label>
        {step.multimedia && (
          <span className="ml-2 text-sm text-text-secondary">
            {step.multimedia.name}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}

export default NewStep
