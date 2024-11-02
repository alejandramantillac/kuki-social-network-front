import React from 'react'
import { InputProps } from '../types/types'

/**
 * Input component to display an input field with optional label and icon.
 * @param {InputProps} props - The properties for the Input component.
 * @param {string} [props.label] - The label to display above the input field.
 * @param {React.ReactNode} [props.icon] - The icon to display inside the input field.
 * @param {string} [props.className] - Additional classes to apply to the input field.
 * @returns {JSX.Element} The rendered Input component.
 */
export const Input: React.FC<InputProps> = ({
  label,
  icon,
  className,
  errors,
  ...props
}) => {
  return (
    <div className="mt-2">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`w-full rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 ${
            icon ? 'pl-10' : ''
          } ${className} ${errors ? 'border-red-500' : 'border-gray-300'}`}
          {...props}
        />
      </div>
      {errors && <p className="text-sm text-red-500">{errors}</p>}
    </div>
  )
}
