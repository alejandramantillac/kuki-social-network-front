import React from 'react'
import StepModalItem from './StepModalItem'
import { Step } from '../../types/model'

/**
 * StepModalList component to display a list of steps.
 * This component maps over an array of steps and renders a StepModalItem for each one.
 * @param {Object} props - The properties for the StepModalList component.
 * @param {Step[]} props.steps - The array of steps to display.
 * @returns {JSX.Element} The rendered StepModalList component.
 * @example
 * <StepModalList steps={steps} />
 */

const StepModalList: React.FC<{ steps: Step[] }> = ({ steps }) => {
  if (!Array.isArray(steps)) {
    return <div>Error: steps is not an array</div>
  }

  return (
    <div className="step-modal-list space-y-4">
      {steps.map((step) => (
        <StepModalItem key={step.id} step={step} />
      ))}

      {steps.length === 0 && <p>No steps found</p>}
    </div>
  )
}

export default StepModalList
