import React, { useState, useRef } from 'react'
import { Plus, GripVertical, X } from 'lucide-react'
import { CreateStep } from '../../types/model'
import { Button } from '../Button'
import { TextArea } from '../TextArea'
import ImageUploader from './ImageUploader'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from '../Input'

interface StepsFormProps {
  onSubmit: (steps: CreateStep[]) => void
  initialSteps: CreateStep[]
}

const StepsForm: React.FC<StepsFormProps> = ({ onSubmit, initialSteps }) => {
  const [steps, setSteps] = useState<CreateStep[]>(
    initialSteps.length > 0
      ? initialSteps
      : [{ stepNumber: 1, description: '', multimedia: null, estimatedTime: 0 }]
  )
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  const addStep = () => {
    setSteps([
      ...steps,
      {
        stepNumber: steps.length + 1,
        description: '',
        multimedia: null,
        estimatedTime: 0,
      },
    ])
  }

  const updateStep = (
    index: number,
    field: keyof CreateStep,
    value: string | File | null | number
  ) => {
    const updatedSteps = [...steps]
    updatedSteps[index] = { ...updatedSteps[index], [field]: value }
    setSteps(updatedSteps)
  }

  const removeStep = (index: number) => {
    setSteps(
      steps
        .filter((_, i) => i !== index)
        .map((step, i) => ({ ...step, stepNumber: i + 1 }))
    )
  }

  const handleDragStart = (index: number) => {
    dragItem.current = index
  }

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index
  }

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newSteps = [...steps]
      const draggedItemContent = newSteps[dragItem.current]
      newSteps.splice(dragItem.current, 1)
      newSteps.splice(dragOverItem.current, 0, draggedItemContent)

      setSteps(
        newSteps.map((step, index) => ({ ...step, stepNumber: index + 1 }))
      )
    }
    dragItem.current = null
    dragOverItem.current = null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(steps)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-3">
      <AnimatePresence>
        {steps.map((step, index) => (
          <motion.div
            key={`step-${step.stepNumber}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => e.preventDefault()}
            className="bg-bg-secondary p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center mb-4 w-full justify-between">
              <div className="flex items-center">
                <div className="mr-4 cursor-move p-2 hover:bg-bg-primary rounded transition-colors duration-200">
                  <GripVertical className="h-6 w-6 text-text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-text-tertiary">
                  Step {step.stepNumber}
                </h3>
                <Input
                  type="number"
                  id={`time-${step.stepNumber}`}
                  value={step.estimatedTime || ''}
                  onChange={(e) =>
                    updateStep(index, 'estimatedTime', e.target.value)
                  }
                  min="0"
                  className="w-24 ml-3 block rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                  placeholder="Enter time in minutes"
                />
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={() => removeStep(index)}
                className="text-text-error hover:text-text-error-hover transition-colors duration-200"
                aria-label={`Remove Step ${step.stepNumber}`}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <TextArea
              value={step.description}
              onChange={(e) => updateStep(index, 'description', e.target.value)}
              placeholder={`Describe step ${step.stepNumber}`}
              className="mb-4 transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
            <ImageUploader
              onChange={(file) => updateStep(index, 'multimedia', file)}
              value={step.multimedia}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          type="button"
          onClick={addStep}
          variant="outline"
          className="w-full py-3 transition-all duration-200 hover:bg-primary hover:text-text-primary"
        >
          <Plus className="mr-2 w-full" /> Add Step
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          type="submit"
          className="w-full py-3 bg-primary text-text-primary hover:bg-primary-hover transition-all duration-200"
        >
          Save and Continue
        </Button>
      </motion.div>
    </form>
  )
}

export default StepsForm
