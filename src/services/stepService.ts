import axiosInstance from '../config/axiosConfig'
import { Step } from '../types/model'

const API_PATH = 'v1/steps'

type StepResponse = {
  content: Step[]
}

/**
 * Fetches steps from the server.
 * @returns {Promise<Step[]>} A promise that resolves to an array of steps.
 * @example
 * const steps = await getSteps();
 */
const getSteps = async (id: string): Promise<Step[]> => {
  const response = await axiosInstance.get<StepResponse>(
    API_PATH + `?recipeId=${id}&page=0&size=10`
  )
  console.log('API response:', response.data) // Verify the API response
  return response.data.content
}

export default {
  getSteps,
}
