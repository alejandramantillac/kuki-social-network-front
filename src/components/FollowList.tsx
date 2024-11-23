import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from './Avatar'
import { Button } from './Button'
import { ChefHat, Users } from 'lucide-react'
import followService from '../services/followService'
import { AuthContext } from '../context/AuthContext'
import authService from '../services/authService'
import userService from '../services/userService'
import { PublicUser } from '../types/model'
import { Spinner } from './Spinner'
import { useNavigate } from 'react-router-dom'

/**
 * FollowList component to display a list of users to follow in a recipe-themed social network.
 * @returns {JSX.Element} The rendered FollowList component.
 */
const FollowList: React.FC = () => {
  const authContext = useContext(AuthContext)
  const [users, setUsers] = useState<PublicUser[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await userService.getAllUsers()
        setUsers(
          usersData.filter(
            (user) => user.username != authService.getUser()?.username
          )
        )
      } catch (error) {
        console.error('Error fetching users:', error)
        setError('Failed to fetch users. Please try again later.')
      }
    }
    fetchUsers()
  }, [])

  const handleFollowToggle = async (username: string, followed: boolean) => {
    if (authContext?.isAuthenticated) {
      if (!followed) {
        await followService.followUser(username)
      } else {
        await followService.unfollowUser(username)
      }
      setUsers((prevUserList) =>
        prevUserList
          ? prevUserList.map((user) =>
              user.username === username
                ? { ...user, followed: !followed }
                : user
            )
          : null
      )
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="bg-bg-primary p-4 sm:p-6 rounded-lg shadow-lg w-full">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <ChefHat className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-text-tertiary">
          Chefs to Follow
        </h2>
      </div>

      <div className="space-y-4">
        {users === null && <Spinner />}
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {users?.slice(0, 3).map((user) => (
          <div
            key={user.username}
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
              onClick={() => handleFollowToggle(user.username, user.followed)}
            >
              {user.followed ? 'Unfollow' : 'Follow'}
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
