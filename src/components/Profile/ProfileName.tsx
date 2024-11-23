import React from 'react'

interface ProfileNameProps {
  name: string
}

const ProfileName: React.FC<ProfileNameProps> = ({ name }) => {
  return (
    <div className="flex font-bold gap-2 rounded-lg shadow-lg p-4 bg-bg-primary justify-center">
      <p className="text-xl">{name}</p>
    </div>
  )
}

export default ProfileName
