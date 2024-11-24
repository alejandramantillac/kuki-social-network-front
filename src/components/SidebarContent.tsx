import React, { useState, useEffect } from 'react'
import { SearchBar } from './SearchBar'
import TagList from './TagList'
import FollowList from './FollowList'
import tagService from '../services/tagService'
import { Tag } from '../types/model'

/**
 * SidebarContent component to display a search bar, a list of trending tags, and a list of users to follow.
 * This component fetches trending tags and users from the server and displays them.
 * It also handles loading state and error handling.
 * @returns {JSX.Element} The rendered SidebarContent component.
 * @example
 * <SidebarContent />
 */
const SidebarContent: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const [tags, setTags] = useState<Tag[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await tagService.getTrendingTags()
        setTags(tagsData)
      } catch (error) {
        console.error('Error fetching tags:', error)
        setError('Failed to fetch tags. Please try again later.')
      }
    }

    fetchTags()
  }, [])

  return (
    <div className="space-y-4 md:sticky md:top-4">
      <SearchBar
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search..."
        className="w-full"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="md:hidden">
        <TagList tags={tags} />
        <div className="my-4"></div>
        <FollowList />
      </div>
      <div className="hidden md:block">
        <TagList tags={tags} />
        <div className="my-4"></div>
        <FollowList />
      </div>
    </div>
  )
}

export default SidebarContent
