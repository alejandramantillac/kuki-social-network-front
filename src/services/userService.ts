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

/**
 * Fetches the current user's information from the server.
 * @returns {Promise<User>} A promise that resolves to the current user's information.
 */
const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get<User>(`${API_PATH}/me`)
  return response.data
}

/**
 * Updates the current user's information on the server.
 * @param {Partial<User>} userData - The user data to update.
 * @returns {Promise<User>} A promise that resolves to the updated user's information.
 */
const updateCurrentUser = async (userData: Partial<User>): Promise<User> => {
  const response = await axiosInstance.put<User>(API_PATH, userData)
  return response.data
}

/**
 * Uploads a profile picture for the current user.
 * @param {File} file - The profile picture file to upload.
 * @returns {Promise<User>} A promise that resolves to the updated user's information.
 */
const uploadProfilePicture = async (file: File): Promise<User> => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axiosInstance.post<User>(
    `${API_PATH}/profile-picture`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}

/**
 * Deletes the profile picture of the current user.
 * @returns {Promise<void>} A promise that resolves when the profile picture is deleted.
 */
const deleteProfilePicture = async (): Promise<void> => {
  await axiosInstance.delete(`${API_PATH}/profile-picture`)
}

export default {
  getAllUsers,
  getCurrentUser,
  updateCurrentUser,
  uploadProfilePicture,
  deleteProfilePicture,
}
