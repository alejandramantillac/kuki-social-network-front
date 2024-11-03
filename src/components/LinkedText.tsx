import React from 'react'
import { LinkedTextProps } from '../types/props'
import { useNavigate } from 'react-router-dom'

const LinkedText: React.FC<LinkedTextProps> = ({
  href,
  text,
  colorClass = 'text-primary',
}) => {
  const navigate = useNavigate()
  return (
    <a
      onClick={() => navigate(href)}
      className={`text-sm ${colorClass} hover:underline hover:text-opacity-80 cursor-pointer`}
    >
      {text}
    </a>
  )
}

export default LinkedText
