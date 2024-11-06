import React from 'react'
import { Notification } from '../../types/model'

/**
 * NotificationItem component to display a single notification.
 * This component displays the content of the notification and its creation date.
 * It also applies different background colors based on whether the notification has been read.
 * @param {Object} props - The properties for the NotificationItem component.
 * @param {Notification} props.notification - The notification object containing its details.
 * @returns {JSX.Element} The rendered NotificationItem component.
 * @example
 * <NotificationItem notification={notification} />
 */
const NotificationItem: React.FC<{ notification: Notification }> = ({
  notification,
}) => {
  return (
    <div
      className={`notification-item p-4 mb-4 rounded-lg shadow-md ${
        notification.isRead ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <p className="text-lg font-semibold">{notification.content}</p>
      <span className="block text-sm text-gray-500 mt-2">
        {new Date(notification.creationDate).toLocaleString()}
      </span>
    </div>
  )
}

export default NotificationItem
