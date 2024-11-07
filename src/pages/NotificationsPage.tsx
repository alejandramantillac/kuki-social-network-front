import React, { useState } from 'react'
import Notifications from '../components/Notifications/Notifications'
import { SearchBar } from '../components/SearchBar'

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
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="notifications-page grid grid-cols-4 gap-4 p-4 bg-bg-secondary min-h-screen">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-4">Notificaciones</h1>
        <Notifications />
      </div>
      <div className="col-span-1">
        <SearchBar
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="h-full"
        />
      </div>
    </div>
  )
}

export default NotificationsPage
