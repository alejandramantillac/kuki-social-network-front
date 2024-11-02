import React from 'react'
import { ButtonProps } from '../types/props'

/**
 * Button component to display a button with different variants and sizes.
 * @param {ButtonProps} props - The properties for the Button component.
 * @param {React.ReactNode} props.children - The content to display inside the button.
 * @param {'primary' | 'secondary' | 'outline'} [props.variant='primary'] - The variant of the button. Defaults to 'primary'.
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - The size of the button. Defaults to 'md'.
 * @param {string} [props.className] - Additional classes to apply to the button.
 * @returns {JSX.Element} The rendered Button component.
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const baseStyles =
    'font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out'
  const variantStyles = {
    primary:
      'bg-primary hover:bg-primary-hover text-text-primary focus:ring-primary',
    secondary:
      'bg-secondary hover:bg-secondary-hover text-text-secondary focus:ring-secondary',
    outline:
      'border border-border-primary text-primary hover:bg-primary-hover focus:ring-primary',
  }
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
