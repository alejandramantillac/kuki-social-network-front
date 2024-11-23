import React from 'react'
import { Avatar } from '../../components/Avatar'

interface ProfileProps {
  avatarSrc: string
  avatarAlt: string
}

const Profile: React.FC<ProfileProps> = ({ avatarSrc, avatarAlt }) => {
  return (
    <div className="flex justify-center text-center rounded-lg shadow-lg p-4 bg-bg-primary">
      <Avatar src={avatarSrc} alt={avatarAlt + ' Photo'} size="xl" />
    </div>
  )
}

export default Profile
