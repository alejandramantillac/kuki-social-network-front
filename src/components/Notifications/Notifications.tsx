import React, { useEffect, useState } from 'react'
import NotificationsList from './NotificationsList'
import notificationService from '../../services/notificationService'
import { Notification } from '../../types/model'

/**
 * Notifications component to fetch and display a list of notifications.
 * This component fetches notifications from the server and displays them using the NotificationsList component.
 * It also handles loading state and error handling.
 * @returns {JSX.Element} The rendered Notifications component.
 * @example
 * <Notifications />
 */
const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.getNotifications()
        if (Array.isArray(data)) {
          setNotifications(data)
        } else {
          console.error('Unexpected response format:', data)
        }
      } catch (error) {
        console.error('Error fetching notifications:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  return (
    <div className="notifications p-4 bg-bg-secondary min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="text-lg font-semibold">Loading...</div>
        </div>
      ) : (
        <NotificationsList notifications={notifications} />
      )}
    </div>
  )
}

export default Notifications
