import React from 'react'
import { ModalProps } from '../../types/props'

/**
 * Modal component to display a modal dialog.
 * @param {ModalProps} props - The properties for the Modal component.
 * @param {boolean} props.isOpen - Indicates whether the modal is open.
 * @param {() => void} props.onClose - Function to call when the modal is closed.
 * @param {React.ReactNode} props.children - The content to display inside the modal.
 * @returns {JSX.Element | null} The rendered Modal component, or null if the modal is not open.
 */
export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={onClose}
          ></div>
        </div>
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          {children}
        </div>
      </div>
    </div>
  )
}
