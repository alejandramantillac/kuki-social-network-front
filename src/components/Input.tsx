import React from 'react'
import { InputProps } from '../types/props'

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
  register,
  errors,
  ...props
}) => {
  return (
    <div className="mt-2">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-text-secondary-hover"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
            {icon}
          </div>
        )}
        <input
          className={`w-full rounded-md border px-3 py-2 placeholder-text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-bg-primary ${
            icon ? 'pl-10' : ''
          } ${className} ${errors ? 'border-text-error' : 'border-text-primary-hover'} dark:text-text-primary bg-bg-secondary`}
          {...props}
          {...register}
        />
      </div>
      {errors && <p className="text-sm text-text-error">{errors}</p>}
    </div>
  )
}
