import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '../Tooltip'
import {
  HomeIcon,
  SearchIcon,
  BellIcon,
  CalendarIcon,
  EditIcon,
  UserIcon,
  MoreHorizontalIcon,
} from 'lucide-react'
import { Avatar } from '../Avatar'
import { Button } from '../Button'

/**
 * Navbar component to display a vertical navigation bar with icons and tooltips.
 * @returns {JSX.Element} The rendered Navbar component.
 */
export const Navbar: React.FC = () => {
  const navigate = useNavigate()

  return (
    <nav className="bg-bg-primary h-full w-20 flex flex-col items-center py-4 space-y-6">
      {/* Logo */}
      <Tooltip text="Home">
        <Button
          variant="none"
          size="sm"
          className="text-border-primary p-0"
          onClick={() => navigate('/feed')}
        >
          <HomeIcon className="h-6 w-6" />
        </Button>
      </Tooltip>

      {/* Navigation Icons */}
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

      <Tooltip text="More options">
        <Button
          variant="none"
          size="sm"
          className="text-border-primary p-0"
          onClick={() => navigate('/more')}
        >
          <MoreHorizontalIcon className="h-6 w-6" />
        </Button>
      </Tooltip>

      {/* Compose Button */}
      <div className="mt-auto">
        <Tooltip text="Post">
          <Button variant="primary" size="lg" className="p-4">
            <EditIcon className="h-5 w-5" />
          </Button>
        </Tooltip>
      </div>

      {/* Avatar */}
      <div className="mt-4">
        <Tooltip text="Account">
          <Avatar src="https://example.com/avatar.jpg" alt="Avatar" size="lg" />
        </Tooltip>
      </div>
    </nav>
  )
}
