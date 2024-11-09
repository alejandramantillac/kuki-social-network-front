import React from 'react'
import Notifications from '../components/Notifications/Notifications'
import SidebarContent from '../components/SidebarContent'

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
    <div className="notifications-page grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-bg-secondary min-h-screen">
      <div className="md:col-span-3 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>
        <div className="flex-grow">
          <Notifications />
        </div>
      </div>
      <div className="md:col-span-1">
        <SidebarContent />
      </div>
    </div>
  )
}

export default NotificationsPage
