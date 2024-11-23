import React from 'react'

interface ProfileFollowsProps {
  followers: number
  follows: number
}

const ProfileFollow: React.FC<ProfileFollowsProps> = ({
  followers,
  follows,
}) => {
  return (
    <div className="flex gap-12 justify-center rounded-lg shadow-lg p-4 bg-bg-primary">
      <div className="text-center">
        <p className="font-semibold">{followers}</p>
        <p className="font-bold">followers</p>
      </div>
      <div className="text-center">
        <p className="font-semibold">{follows}</p>
        <p className="font-bold">follows</p>
      </div>
    </div>
  )
}

export default ProfileFollow
