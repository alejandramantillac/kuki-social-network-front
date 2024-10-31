import React from 'react'

interface FooterLinksProps {
  title: string
  links: { name: string; href: string }[]
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ title, links }) => {
  return (
    <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
          {title}
        </h3>
        <ul className="mt-4 space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-base text-gray-500 hover:text-gray-900"
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
