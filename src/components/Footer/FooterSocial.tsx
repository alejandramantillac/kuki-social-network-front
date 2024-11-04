import React from 'react'
import { Facebook, X, Instagram } from 'lucide-react'

/**
 * FooterSocial component to display social media links in the footer.
 * @returns {JSX.Element} The rendered FooterSocial component.
 */
export const FooterSocial: React.FC = () => {
  return (
    <div className="mt-8 xl:mt-0">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
        Follow us on other social networks
      </h3>
      <div className="mt-4 flex space-x-6">
        <a href="#" className="text-text-secondary hover:text-primary">
          <span className="sr-only">Facebook</span>
          <Facebook className="h-6 w-6" />
        </a>
        <a href="#" className="text-text-secondary hover:text-primary">
          <span className="sr-only">X</span>
          <X className="h-6 w-6" />
        </a>
        <a href="#" className="text-text-secondary hover:text-primary">
          <span className="sr-only">Instagram</span>
          <Instagram className="h-6 w-6" />
        </a>
      </div>
    </div>
  )
}
