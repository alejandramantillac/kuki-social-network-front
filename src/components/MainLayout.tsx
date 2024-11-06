import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar/Navbar'

/**
 * MainLayout component to provide a consistent layout with a navigation bar.
 * This component uses CSS Grid to create a two-column layout where the first column
 * contains the Navbar and the second column contains the main content.
 * @returns {JSX.Element} The rendered MainLayout component.
 * @example
 * <MainLayout>
 *   <Outlet />
 * </MainLayout>
 */
const MainLayout: React.FC = () => {
  return (
    <div className="main-layout grid grid-cols-[auto,1fr] min-h-screen">
      <Navbar />
      <div className="content p-4">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
