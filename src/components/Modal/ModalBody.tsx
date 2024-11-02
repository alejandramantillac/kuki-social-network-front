import React from 'react'
import { ModalBodyProps } from '../../types/types'

/**
 * ModalBody component to display the body content of a modal.
 * @param {ModalBodyProps} props - The properties for the ModalBody component.
 * @param {React.ReactNode} props.children - The content to display inside the modal body.
 * @returns {JSX.Element} The rendered ModalBody component.
 */
export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>
  )
}
