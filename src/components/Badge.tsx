import React from 'react'
import { BadgeProps } from '../types/props'

/**
 * Badge component to display a label with different background colors.
 * @param {BadgeProps} props - The properties for the Badge component.
 * @param {string} props.text - The text to display inside the badge.
 * @param {'gray' | 'red' | 'green' | 'blue' | 'yellow'} [props.color='gray'] - The background color of the badge. Defaults to 'gray'.
 * @returns {JSX.Element} The rendered Badge component.
 */
export const Badge: React.FC<BadgeProps> = ({ text, color = 'gray' }) => {
  const colorClasses = {
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-medium ${colorClasses[color]}`}
    >
      {text}
    </span>
  )
}
