import React, { JSX, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '../Tooltip'
import {
  HomeIcon,
  Bookmark,
  BellIcon,
  CalendarIcon,
  EditIcon,
  User,
  Settings,
  UserIcon,
  LogOut,
} from 'lucide-react'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { ResponsiveProps } from '../../types/props'
import ResponsiveContainer from '../Layout/ResponsiveContainer'
import { AuthContext } from '../../context/AuthContext'
import authService from '../../services/authService'

/**
 * Navbar component to display a vertical navigation bar with icons and tooltips.
 * @returns {JSX.Element} The rendered Navbar component.
 */
export const Navbar: React.FC<ResponsiveProps> = ({
  isMobile,
}): JSX.Element => {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
            <Button
              variant="none"
              size="sm"
              className="p-0"
              onClick={() =>
                navigate(`/profile/${authContext.currentUser?.username}`)
              }
            >
              <Avatar
                src={authContext?.currentUser?.photoUrl}
                alt="Avatar"
                size="md"
              />
            </Button>
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

        <Tooltip text="Saved">
          <Button
            variant="none"
            size="sm"
            className="text-border-primary p-0"
            onClick={() => navigate('/saved')}
          >
            <Bookmark className="h-6 w-6" />
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

        {authContext?.isAuthenticated && (
          <div className="relative group">
            <Button
              variant="none"
              size="sm"
              className="text-border-primary p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Settings className="h-6 w-6" />
            </Button>
            {isMenuOpen && (
              <div
                className={`absolute bg-bg-primary shadow-lg rounded-md mt-2  ${isMobile ? 'left-0' : '-top-2 left-16'}`}
              >
                <Tooltip text="Account">
                  <Button
                    variant="none"
                    size="sm"
                    className="text-border-primary p-0"
                    onClick={() => navigate('/settings')}
                  >
                    <UserIcon className="h-6 w-6" />
                  </Button>
                </Tooltip>
                <Tooltip text="Loggout">
                  <Button
                    variant="none"
                    size="sm"
                    className="text-border-primary p-0"
                    onClick={() => authService.logout()}
                  >
                    <LogOut className="h-6 w-6" />
                  </Button>
                </Tooltip>
              </div>
            )}
          </div>
        )}
      </ResponsiveContainer>

      {/* Compose Button */}
      <div className="mt-auto">
        <Tooltip text="Post">
          <Button
            variant="primary"
            size="lg"
            className="p-4"
            onClick={() => navigate('/create-recipe')}
          >
            <EditIcon className="h-5 w-5" />
          </Button>
        </Tooltip>
      </div>
    </nav>
  )
}

export default Navbar
