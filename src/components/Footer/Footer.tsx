import React from 'react'

interface FooterProps {
  children: React.ReactNode
}

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">{children}</div>
      </div>
    </footer>
  )
}
