import React from 'react'
import { TooltipProps } from '../types/types'

/**
 * Tooltip component to display additional information when hovering over an element.
 * @param {TooltipProps} props - The properties for the Tooltip component.
 * @param {string} props.text - The text to display inside the tooltip.
 * @param {React.ReactNode} props.children - The content over which the tooltip will be displayed.
 * @returns {JSX.Element} The rendered Tooltip component.
 */
export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        {text}
      </div>
    </div>
  )
}
