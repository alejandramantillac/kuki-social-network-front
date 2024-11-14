import React from 'react'
import { Modal } from './Modal/Modal'
import { ModalBody } from './Modal/ModalBody'
import { ModalFooter } from './Modal/ModalFooter'
import { ModalHeader } from './Modal/ModalHeader'
import { Button } from './Button'
import { StepModalProps } from '../types/props'

export const StepModal: React.FC<StepModalProps> = ({ isOpen, onClose }) => {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader title="Step Title" onClose={onClose} />
        <ModalBody>
          <div className="Step-Image">
            <img src="https://via.placeholder.com/150" alt="Step Image" />
          </div>
          <div className="step-container">
            <h2>Ingredients</h2>
            <ul>
              <li></li>
            </ul>

            <h2>Instructions</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              aspernatur, sit a hic facere voluptatem! Itaque perferendis alias
              eum aliquam fugit modi possimus repellendus esse, ut, saepe
              consequatur nihil voluptatem!
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" size="md" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
