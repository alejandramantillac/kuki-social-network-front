import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User } from '../types/model'
import { AuthContext } from '../context/AuthContext'
import userService from '../services/userService'
import followService from '../services/followService'

import Profile from '../components/Profile/Profile'
import ProfileName from '../components/Profile/ProfileName'
import ProfileFollow from '../components/Profile/ProfileFollow'
import FollowButton from '../components/Profile/FollowButton'
import ProfileBiography from '../components/Profile/ProfileBiography'
import PostList from '../components/Post/PostList'

type FollowFields = 'followers' | 'follows'

const ProfilePage: React.FC = () => {
  const authContext = useContext(AuthContext)

  const { username } = useParams<{ username: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [followFields, setFollowFields] = useState<
    Record<FollowFields, number>
  >({
    followers: 0,
    follows: 0,
  })
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollowToggle = async (username: string, followed: boolean) => {
    if (authContext?.isAuthenticated) {
      if (!followed) {
        await followService.followUser(username)
        setIsFollowing(true)
      } else {
        await followService.unfollowUser(username)
        setIsFollowing(false)
      }

      handFollowFields(username)
    }
  }

  const handFollowFields = async (username: string) => {
    const followers = await followService.getFollowedUsersCount(username)
    const follows = await followService.getFollowingUsersCount(username)
    setFollowFields({
      followers: followers,
      follows: follows,
    })
  }

  useEffect(() => {
    if (!username) {
      return
    }

    const fetchUser = async () => {
      try {
        const currentUser = await userService.getCurrentUser()

        if (authContext?.isAuthenticated && username === 'me') {
          setUser(currentUser)
        } else {
          const user = await userService.getUserByUserName(username)
          setUser(user)
        }

        const isFollowing = await followService.isFollowing(
          currentUser.username,
          username
        )
        setIsFollowing(isFollowing)

        handFollowFields(username)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-bg-secondary min-h-screen">
      <div className="flex-1 md:flex-2 px-4 min-h-screen flex flex-col gap-4">
        <Profile
          avatarSrc={user?.photoUrl || ''}
          avatarAlt={user?.name || 'User'}
        />
        <ProfileName name={user?.username || ''} />
        <ProfileFollow
          followers={followFields.followers}
          follows={followFields.follows}
        />
        <div
          className="flex"
          onClick={() => handleFollowToggle(user?.username || '', isFollowing)}
        >
          <FollowButton followed={isFollowing} />
        </div>
        <ProfileBiography biography={user?.biography || ''} />
      </div>
      <div className="col-span-2 flex-1 md:flex-1 px-4">
        <PostList filters={{ sortBy: 'publishDate' }} />
      </div>
    </div>
  )
}

export default ProfilePage
