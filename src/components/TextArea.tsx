import React from 'react'
import { TextAreaProps } from '../types/props'

/**
 * TextArea component to display a textarea field with optional label and icon.
 * @param {TextAreaProps} props - The properties for the TextArea component.
 * @param {string} [props.label] - The label to display above the textarea field.
 * @param {React.ReactNode} [props.icon] - The icon to display inside the textarea field.
 * @param {string} [props.className] - Additional classes to apply to the textarea field.
 * @returns {JSX.Element} The rendered TextArea component.
 */
export const TextArea: React.FC<TextAreaProps> = ({
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
        <textarea
          className={`w-full rounded-md border px-3 py-2 placeholder-text-secondary shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary bg-bg-secondary dark:text-text-primary dark:border-bg-primary ${
            icon ? 'pl-10' : ''
          } ${className} ${errors ? 'border-text-error' : 'border-text-primary-hover'}`}
          {...props}
          {...register}
        />
      </div>
      {errors && <p className="text-sm text-text-error">{errors}</p>}
    </div>
  )
}
