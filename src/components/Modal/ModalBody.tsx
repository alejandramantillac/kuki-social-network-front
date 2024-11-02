import React from 'react'
import { ModalBodyProps } from '../../types/types'

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">{children}</div>
  )
}
