import React, { JSX, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '../Tooltip'
import {
  HomeIcon,
  SearchIcon,
  BellIcon,
  CalendarIcon,
  EditIcon,
  UserIcon,
  User,
} from 'lucide-react'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { ResponsiveProps } from '../../types/props'
import ResponsiveContainer from '../Layout/ResponsiveContainer'
import { AuthContext } from '../../context/AuthContext'

/**
 * Navbar component to display a vertical navigation bar with icons and tooltips.
 * @returns {JSX.Element} The rendered Navbar component.
 */
export const Navbar: React.FC<ResponsiveProps> = ({
  isMobile,
}): JSX.Element => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const position = () => {
    if (isMobile) {
      return 'w-full h-20 fixed top-0 flex-row'
    } else {
      return 'h-full w-20 fixed top-0 left-0 flex-col'
    }
  }

  return (
    <nav
      className={`bg-bg-primary flex items-center p-4 space-6 z-50 content-around justify-around ${position()}`}
    >
      {/* Avatar */}
      <div className="mt-4">
        {authContext?.isAuthenticated ? (
          <Tooltip text="Account">
            <Avatar
              src={authContext?.currentUser?.photoUrl}
              alt="Avatar"
              size="lg"
              url={`/user/${authContext?.currentUser?.username}`}
            />
          </Tooltip>
        ) : (
          <Button
            variant="secondary"
            size="sm"
            className="p-4"
            onClick={() => navigate('/login')}
          >
            <User className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Navigation Icons */}
      <ResponsiveContainer orientation={isMobile ? 'horizontal' : 'vertical'}>
        {/* Home */}
        <Tooltip text="Home">
          <Button
            variant="none"
            size="sm"
            className="text-border-primary p-0"
            onClick={() => navigate('/')}
          >
            <HomeIcon className="h-6 w-6" />
          </Button>
        </Tooltip>

        <Tooltip text="Explore">
          <Button
            variant="none"
            size="sm"
            className="text-border-primary p-0"
            onClick={() => navigate('/explore')}
          >
            <SearchIcon className="h-6 w-6" />
          </Button>
        </Tooltip>

        <Tooltip text="Notifications">
          <Button
            variant="none"
            size="sm"
            className="text-border-primary p-0"
            onClick={() => navigate('/notifications')}
          >
            <BellIcon className="h-6 w-6" />
          </Button>
        </Tooltip>

        <Tooltip text="Planner">
          <Button
            variant="none"
            size="sm"
            className="text-border-primary p-0"
            onClick={() => navigate('/planner')}
          >
            <CalendarIcon className="h-6 w-6" />
          </Button>
        </Tooltip>

        <Tooltip text="Profile">
          <Button
            variant="none"
            size="sm"
            className="text-border-primary p-0"
            onClick={() => navigate('/profile')}
          >
            <UserIcon className="h-6 w-6" />
          </Button>
        </Tooltip>
      </ResponsiveContainer>

      {/* Compose Button */}
      <div className="mt-auto">
        <Tooltip text="Post">
          <Button variant="primary" size="lg" className="p-4">
            <EditIcon className="h-5 w-5" />
          </Button>
        </Tooltip>
      </div>
    </nav>
  )
}

export default Navbar
