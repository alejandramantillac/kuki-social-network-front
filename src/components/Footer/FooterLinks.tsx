import React from 'react'
import { FooterLinksProps } from '../../types/props'

/**
 * FooterLinks component to display a list of links in the footer.
 * @param {FooterLinksProps} props - The properties for the FooterLinks component.
 * @param {string} props.title - The title of the links section.
 * @param {Array<{name: string, href: string}>} props.links - The array of links, each containing a name and href.
 * @returns {JSX.Element} The rendered FooterLinks component.
 */
export const FooterLinks: React.FC<FooterLinksProps> = ({ title, links }) => {
  return (
    <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
          {title}
        </h3>
        <ul className="mt-4 space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-base text-text-secondary hover:text-text-secondary-hover"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
