import React from 'react'
import NotificationsItem from './NotificationsItem'
import { Notification } from '../../types/model'

/**
 * NotificationList component to display a list of notifications.
 * This component maps over an array of notifications and renders a NotificationItem for each one.
 * @param {Object} props - The properties for the NotificationList component.
 * @param {Notification[]} props.notifications - The array of notifications to display.
 * @returns {JSX.Element} The rendered NotificationList component.
 * @example
 * <NotificationList notifications={notifications} />
 */
const NotificationList: React.FC<{ notifications: Notification[] }> = ({
  notifications,
}) => {
  if (!Array.isArray(notifications)) {
    return <div>Error: notifications is not an array</div>
  }

  return (
    <div className="notification-list space-y-4">
      {notifications.map((notification) => (
        <NotificationsItem key={notification.id} notification={notification} />
      ))}
    </div>
  )
}

export default NotificationList
