import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { CreateStep } from '../../types/model'
import { Button } from '../Button'
import NewStep from '../Creation/NewStep'
import { Spinner } from '../Spinner'
interface StepsFormProps {
  onSuccess: (steps: CreateStep[]) => void
  loading?: boolean
}

const StepsForm: React.FC<StepsFormProps> = ({ onSuccess, loading }) => {
  const [steps, setSteps] = useState<CreateStep[]>([
    { stepNumber: 1, description: '', multimedia: null },
  ])
  const [errors, setErrors] = useState<string[]>([])

  const addStep = () => {
    setSteps([
      ...steps,
      {
        stepNumber: steps.length + 1,
        description: '',
        multimedia: null,
      },
    ])
    setErrors([...errors, ''])
  }

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index)
    setSteps(newSteps.map((step, i) => ({ ...step, stepNumber: i + 1 })))
    const newErrors = errors.filter((_, i) => i !== index)
    setErrors(newErrors)
  }

  const updateStepDescription = (index: number, description: string) => {
    const newSteps = [...steps]
    newSteps[index].description = description
    setSteps(newSteps)

    if (description) {
      const newErrors = [...errors]
      newErrors[index] = ''
      setErrors(newErrors)
    }
  }

  const updateStepMultimedia = (index: number, file: File | null) => {
    const newSteps = [...steps]
    newSteps[index].multimedia = file
    setSteps(newSteps)

    if (file) {
      const newErrors = [...errors]
      newErrors[index] = ''
      setErrors(newErrors)
    }
  }

  const validateSteps = (): boolean => {
    const validationErrors = steps.map((step) => {
      if (!step.description) return 'Description is required'
      if (!step.multimedia) return 'Media file is required'
      return ''
    })

    setErrors(validationErrors)
    return validationErrors.every((error) => !error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateSteps()) return
    onSuccess(steps)
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newSteps = Array.from(steps)
    const [reorderedStep] = newSteps.splice(result.source.index, 1)
    newSteps.splice(result.destination.index, 0, reorderedStep)

    setSteps(
      newSteps.map((step, index) => ({ ...step, stepNumber: index + 1 }))
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-text-secondary mb-4">
        Recipe Steps
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {steps.map((step, index) => (
                <Draggable
                  key={step.stepNumber}
                  draggableId={`step-${step.stepNumber}`}
                  index={index}
                >
                  {(provided) => (
                    <NewStep
                      step={step}
                      index={index}
                      error={errors[index]}
                      onRemove={() => removeStep(index)}
                      onUpdateDescription={(desc) =>
                        updateStepDescription(index, desc)
                      }
                      onUpdateMultimedia={(file) =>
                        updateStepMultimedia(index, file)
                      }
                      provided={provided}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button type="button" onClick={addStep} className="w-full">
        <Plus className="w-4 h-4 mr-2" /> Add Step
      </Button>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Spinner /> : null}
        {loading ? 'Saving Recipe...' : 'Save Recipe'}
      </Button>
    </form>
  )
}

export default StepsForm
