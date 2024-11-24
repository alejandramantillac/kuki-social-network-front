import React from 'react'
import { Step } from '../../types/model'
import { Card } from '../Card'

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
      <h2></h2>
      <img src={step.multimediaUrl} alt={`Step ${step.number}`} />
      <p className="text-lg font-semibold">{step.description}</p>
    </Card>
  )
}

export default StepModalItem
