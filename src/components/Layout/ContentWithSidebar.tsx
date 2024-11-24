import React from 'react'
import SidebarContent from '../SidebarContent'
import { Outlet } from 'react-router-dom'

const ContentWithSidebar: React.FC = () => {
  return (
    <div className="notifications-page grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-bg-secondary min-h-screen">
      <div className="md:col-span-3 flex flex-col">
        <Outlet />
      </div>
      <div className="md:col-span-1">
        <SidebarContent />
      </div>
    </div>
  )
}

export default ContentWithSidebar
