import React from 'react'

interface ProfileBiographyProps {
  biography: string
}

const ProfileBiography: React.FC<ProfileBiographyProps> = ({ biography }) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg shadow-lg p-8 bg-bg-primary">
      <p className="italic font-semibold">About me</p>
      <p>{biography}</p>
    </div>
  )
}

export default ProfileBiography
