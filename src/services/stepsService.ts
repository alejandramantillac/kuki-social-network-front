import axiosInstance from '../config/axiosConfig'
import { Step, CreateStepRequest } from '../types/model'

const API_PATH = 'v1/steps'

/**
 * Creates a new step.
 * @param {CreateStepRequest} data - The step data to create.
 * @param {File[]} files - The files to upload.
 * @returns {Promise<Step>} A promise that resolves to the created step.
 */
const createSteps = async (data: CreateStepRequest): Promise<Step> => {
  const formData = new FormData()
  formData.append(
    'request',
    new Blob([JSON.stringify(data)], { type: 'application/json' })
  )
  data.steps.forEach((step) => {
    if (step.multimedia) {
      formData.append('files', step.multimedia)
      step.multimedia = null
    }
  })

  const response = await axiosInstance.post<Step>(API_PATH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

export default { createSteps }
