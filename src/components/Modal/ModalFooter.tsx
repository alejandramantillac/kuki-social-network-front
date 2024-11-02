import React from 'react'
import { ModalFooterProps } from '../../types/props'

/**
 * ModalFooter component to display the footer content of a modal.
 * @param {ModalFooterProps} props - The properties for the ModalFooter component.
 * @param {React.ReactNode} props.children - The content to display inside the modal footer.
 * @returns {JSX.Element} The rendered ModalFooter component.
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return (
    <div className="bg-bg-secondary px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      {children}
    </div>
  )
}
