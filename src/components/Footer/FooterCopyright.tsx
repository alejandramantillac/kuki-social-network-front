import React from 'react'

interface FooterCopyrightProps {
  companyName: string
}

export const FooterCopyright: React.FC<FooterCopyrightProps> = ({
  companyName,
}) => {
  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <p className="text-base text-gray-400 xl:text-center">
        &copy; {new Date().getFullYear()} {companyName}. Todos los derechos
        reservados.
      </p>
    </div>
  )
}
