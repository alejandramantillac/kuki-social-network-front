import React from 'react'
import { Step } from '../../types/model'

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
    <div className="step-modal-item p-4 mb-4 rounded-lg shadow-md bg-white">
      <h2>Step # {step.number}</h2>
      <img src={step.multimediaUrl} alt="StepImage" />
      <p className="text-lg font-semibold">{step.description}</p>
    </div>
  )
}

export default StepModalItem
