import React, { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import { Button } from '../Button'
import { CreateStep } from '../../types/model'
import NewStep from '../Creation/NewStep'

interface StepsFormProps {
  onSuccess: (steps: CreateStep[]) => void
}

const StepsForm: React.FC<StepsFormProps> = ({ onSuccess }) => {
  const [steps, setSteps] = useState<CreateStep[]>([
    { stepNumber: 1, description: '', multimedia: null },
  ])
  const [errors, setErrors] = useState<string[]>([]) // Errores por paso

  const addStep = () => {
    setSteps([
      ...steps,
      {
        stepNumber: steps.length + 1,
        description: '',
        multimedia: null,
      },
    ])
    setErrors([...errors, '']) // Añadir espacio para error del nuevo paso
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

    // Limpiar error si se añadió descripción
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

    // Limpiar error si se añadió multimedia
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
    <form onSubmit={handleSubmit}>
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
      <Button type="button" onClick={addStep} className="mb-4">
        <Plus className="w-4 h-4 mr-2" /> Add Step
      </Button>
      <Button type="submit" className="w-full">
        Save Recipe
      </Button>
    </form>
  )
}

export default StepsForm
