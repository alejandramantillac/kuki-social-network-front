import React from 'react'
import Notifications from '../components/Notifications/Notifications'

/**
 * NotificationsPage component to display the notifications page.
 * This component renders a heading and the Notifications component.
 *
 * @returns {JSX.Element} The rendered NotificationsPage component.
 *
 * @example
 * <NotificationsPage />
 */
const NotificationsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 dark:text-text-primary">
        Notificaciones
      </h1>
      <div className="flex-grow">
        <Notifications />
      </div>
    </div>
  )
}

export default NotificationsPage
