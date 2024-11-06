import axiosInstance from '../config/axiosConfig'
import { Notification } from '../types/model'

const API_PATH = 'v1/notifications'

/**
 * Fetches notifications from the server.
 * @returns {Promise<Notification[]>} A promise that resolves to an array of notifications.
 * @example
 * const notifications = await getNotifications()
 */
const getNotifications = async (): Promise<Notification[]> => {
  const response = await axiosInstance.get<{ content: Notification[] }>(
    API_PATH
  )
  console.log('API response:', response.data) // Verify the API response
  return response.data.content
}

/**
 * Marks a notification as read.
 * @param {string} notificationId - The ID of the notification to mark as read.
 * @returns {Promise<Notification>} A promise that resolves to the updated notification.
 * @example
 * const updatedNotification = await markAsRead('notification-id')
 */
const markAsRead = async (notificationId: string): Promise<Notification> => {
  const response = await axiosInstance.put<Notification>(
    `${API_PATH}/read/${notificationId}`
  )
  return response.data
}

export default {
  getNotifications,
  markAsRead,
}
