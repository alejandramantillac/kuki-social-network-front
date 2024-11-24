import React from 'react'
import { Recipe } from '../../types/model'
import PostItem from '../Post/PostItem'

interface SavedProps {
  savedPosts: Recipe[]
}

const Saved: React.FC<SavedProps> = ({ savedPosts }) => {
  return (
    <div className="post-list">
      {savedPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Saved
