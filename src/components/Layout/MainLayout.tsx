import React from 'react'
import { MainLayoutProps } from '../../types/props'

export const MainLayout: React.FC<MainLayoutProps> = ({
  isMobile,
  children,
}) => {
  const position = () => {
    if (isMobile) {
      return 'p-4 mt-20'
    } else {
      return 'p-4 ml-20'
    }
  }

  return <div className={`${position()}`}>{children}</div>
}
