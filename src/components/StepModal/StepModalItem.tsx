import React from 'react'
import { Step } from '../../types/model'
import { formatDuration } from '../../utils/timeUtils'
import { Card } from '../Card'
import { Clock } from 'lucide-react'

/**
 * StepModalItem component to display a single step.
 * This component displays the content of the step and its creation date.
 * @param {Object} props - The properties for the StepModalItem component.
 * @param {Step} props.step - The step object containing its details.
 * @returns {JSX.Element} The rendered StepModalItem component.
 * @example
 * <StepModalItem step={step} />
 */

const StepModalItem: React.FC<{ step: Step }> = ({ step }) => {
  return (
    <Card title={`Step # ${step.number}`} description="">
      <img src={step.multimediaUrl} alt={`Step ${step.number}`} />
      <div className="flex items-center text-sm text-text-secondary mb-4">
        <Clock className="w-4 h-4 mr-1" />
        <span className="mr-4">{formatDuration(step.estimatedTime!)}</span>
      </div>
      <h3 className="text-lg font-semibold">Description</h3>
      <p className="text-lg">{step.description}</p>
    </Card>
  )
}

export default StepModalItem
