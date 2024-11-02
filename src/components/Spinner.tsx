import React from 'react'
import { SpinnerProps } from '../types/types'

/**
 * Spinner component to display a loading spinner with different sizes.
 * @param {SpinnerProps} props - The properties for the Spinner component.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the spinner. Defaults to 'md'.
 * @returns {JSX.Element} The rendered Spinner component.
 */
export const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  }

  return (
    <div
      className={`border-4 border-gray-200 border-t-4 border-t-orange-600 rounded-full animate-spin justify-self-center ${sizeClasses[size]}`}
    ></div>
  )
}
