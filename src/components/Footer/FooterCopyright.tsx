import React from 'react'
import { FooterCopyrightProps } from '../../types/props'

/**
 * FooterCopyright component to display copyright information in the footer.
 * @param {FooterCopyrightProps} props - The properties for the FooterCopyright component.
 * @param {string} props.companyName - The name of the company to display in the copyright text.
 * @returns {JSX.Element} The rendered FooterCopyright component.
 */
export const FooterCopyright: React.FC<FooterCopyrightProps> = ({
  companyName,
}) => {
  return (
    <div className="mt-8 border-t border-secondary pt-8">
      <p className="text-base text-text-secondary xl:text-center">
        &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
      </p>
    </div>
  )
}
