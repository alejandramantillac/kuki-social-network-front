import React from 'react'
import { BadgeProps } from '../types/props'

/**
 * Badge component to display a label with different background colors.
 * @param {BadgeProps} props - The properties for the Badge component.
 * @param {string} props.text - The text to display inside the badge.
 * @param {'gray' | 'red' | 'green' | 'blue' | 'yellow' | 'primary' | 'secondary'} [props.color='gray'] - The background color of the badge. Defaults to 'gray'.
 * @param {string} [props.className] - Additional classes to apply to the badge.
 * @returns {JSX.Element} The rendered Badge component.
 */
export const Badge: React.FC<BadgeProps> = ({
  text,
  color = 'gray',
  className,
}) => {
  const colorClasses = {
    gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    red: 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-300',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300',
    yellow:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300',
    primary:
      'bg-primary text-text-primary dark:bg-primary dark:text-text-primary',
    secondary:
      'bg-secondary text-text-secondary dark:bg-secondary dark:text-text-secondary',
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-medium ${colorClasses[color]} ${className}`}
    >
      {text}
    </span>
  )
}
