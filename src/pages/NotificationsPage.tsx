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
    <div className="notifications-page p-4 bg-bg-secondary min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>
      <Notifications />
    </div>
  )
}

export default NotificationsPage
