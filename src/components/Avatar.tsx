import React from 'react'
import { AvatarProps } from '../types/types'

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <img src={src} alt={alt} className={`rounded-full ${sizeClasses[size]}`} />
  )
}
