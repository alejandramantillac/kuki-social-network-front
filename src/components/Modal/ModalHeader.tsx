import React from 'react'
import { X } from 'lucide-react'
import { ModalHeaderProps } from '../../types/types'

/**
 * ModalHeader component to display the header of a modal.
 * @param {ModalHeaderProps} props - The properties for the ModalHeader component.
 * @param {string} props.title - The title to display in the modal header.
 * @param {() => void} props.onClose - Function to call when the close button is clicked.
 * @returns {JSX.Element} The rendered ModalHeader component.
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <div className="bg-gray-50 px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        <button
          onClick={onClose}
          className="rounded-md bg-gray-50 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          <span className="sr-only">Close</span>
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
