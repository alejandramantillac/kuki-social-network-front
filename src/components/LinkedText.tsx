import React from 'react'
import { LinkedTextProps } from '../types/props'

const LinkedText: React.FC<LinkedTextProps> = ({
  href,
  text,
  colorClass = 'text-primary',
}) => {
  return (
    <a href={href} className={`text-sm ${colorClass} hover:underline`}>
      {text}
    </a>
  )
}

export default LinkedText
