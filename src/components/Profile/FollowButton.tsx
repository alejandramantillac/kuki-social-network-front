import React from 'react'
import { Button } from '../Button'
import { FollowButtonProps } from '../../types/props'

const FollowButton: React.FC<FollowButtonProps> = ({ followed }) => {
  return (
    <Button
      variant={followed ? 'outline' : 'primary'}
      children={followed ? 'Unfollow' : 'Follow'}
      className="w-full"
    />
  )
}

export default FollowButton
