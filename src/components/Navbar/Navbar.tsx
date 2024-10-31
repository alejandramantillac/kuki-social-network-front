import React from 'react'

interface NavbarProps {
  children: React.ReactNode
}

export const Navbar: React.FC<NavbarProps> = ({ children }) => {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {children}
        </div>
      </div>
    </nav>
  )
}