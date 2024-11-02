import React from 'react'
import { FooterProps } from '../../types/props'

/**
 * Footer component to display a footer section with children elements.
 * @param {FooterProps} props - The properties for the Footer component.
 * @param {React.ReactNode} props.children - The content to display inside the footer.
 * @returns {JSX.Element} The rendered Footer component.
 */
export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">{children}</div>
      </div>
    </footer>
  )
}
