import React from 'react'
import { FollowListProps } from '../types/props'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { ChefHat, Users } from 'lucide-react'

/**
 * FollowList component to display a list of users to follow in a recipe-themed social network.
 * @param {FollowListProps} props - The properties for the FollowList component.
 * @param {User[]} props.users - The array of users to display.
 * @returns {JSX.Element} The rendered FollowList component.
 */
const FollowList: React.FC<FollowListProps> = ({ users }) => {
  return (
    <div className="bg-bg-primary p-4 sm:p-6 rounded-lg shadow-lg w-full">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <ChefHat className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-text-tertiary">
          Chefs to Follow
        </h2>
      </div>

      <div className="space-y-4">
        {users.slice(0, 3).map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary-hover transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <Avatar src={user.photoUrl} alt={user.name} size="sm" />
              <div>
                <span className="font-medium text-text-tertiary block text-sm sm:text-base">
                  {user.name}
                </span>
                <span className="text-xs sm:text-sm text-text-secondary">
                  @{user.username}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-secondary-hover hover:text-primary-hover transition-colors duration-200 text-xs sm:text-sm"
              size="sm"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-100">
        <button className="flex items-center gap-2 text-primary hover:text-primary-hover text-sm font-medium transition-colors duration-200 w-full justify-center">
          <Users className="h-4 w-4" />
          <span>See more chefs</span>
        </button>
      </div>
    </div>
  )
}

export default FollowList
