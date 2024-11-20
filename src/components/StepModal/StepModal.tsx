import React, { useEffect, useState } from 'react'
import { Modal } from '../Modal/Modal'
import { ModalBody } from '../Modal/ModalBody'
import { ModalFooter } from '../Modal/ModalFooter'
import { ModalHeader } from '../Modal/ModalHeader'
import { Button } from '../Button'
import { StepModalProps } from '../../types/props'
import { Step } from '../../types/model'
import stepService from '../../services/stepService'
import StepModalList from './StepModalList'
import { Spinner } from '../Spinner'

export const StepModal: React.FC<StepModalProps> = ({
  isOpen,
  onClose,
  id,
}) => {
  const [step, setStep] = useState<Step[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStep = async () => {
      try {
        const data = await stepService.getSteps(id)
        if (Array.isArray(data)) {
          setStep(data)
        } else {
          console.error('Unexpected response format:', data)
        }
      } catch (error) {
        console.error('Error fetching steps:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStep()
  }, [])

  return (
    <div className="p-4 ml-20">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader title="Steps" onClose={onClose} />
        <ModalBody>
          {loading ? (
            <div className="flex justify-center items-center h-100">
              <Spinner size="md" />
            </div>
          ) : (
            <StepModalList steps={step} />
          )}
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
