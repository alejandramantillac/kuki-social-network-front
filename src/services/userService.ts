import axiosInstance from '../config/axiosConfig'
import { User } from '../types/model'

const API_PATH = 'v1/users'

/**
 * Fetches all users from the server.
 * @returns {Promise<User[]>} A promise that resolves to an array of users.
 */
const getAllUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>(API_PATH)
  return response.data
}

export default {
  getAllUsers,
}
