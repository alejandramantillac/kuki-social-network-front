import React from 'react'
import { AvatarProps } from '../types/props'
import { useNavigate } from 'react-router-dom'

/**
 * Avatar component to display a user's avatar image with different sizes.
 * @param {AvatarProps} props - The properties for the Avatar component.
 * @param {string} props.src - The source URL of the avatar image.
 * @param {string} props.alt - The alt text for the avatar image.
 * @param {'sm' | 'md' | 'lg' | 'xl'} [props.size='md'] - The size of the avatar. Defaults to 'md'.
 * @param {string} [props.url] - The URL to link to when the avatar is clicked.
 * @returns {JSX.Element} The rendered Avatar component.
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  user,
}) => {
  const navigate = useNavigate()
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-48 h-48',
  }

  const avatarImage = (
    <div className={`${sizeClasses[size]}`}>
      <img
        src={src}
        alt={alt}
        className={`rounded-full ${sizeClasses[size]} object-cover object-center cursor-pointer`}
        onClick={() => user && navigate(`/profile/${user}`)}
      />
    </div>
  )

  return avatarImage
}
