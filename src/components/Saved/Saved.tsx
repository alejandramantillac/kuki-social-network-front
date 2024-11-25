import React from 'react'
import { Recipe } from '../../types/model'
import { useDispatch } from 'react-redux'
import PostItem from '../Post/PostItem'
import { AppDispatch } from '../../store/store'
import { removePost } from '../../store/slices/postSlice'

interface SavedProps {
  savedPosts: Recipe[]
}

const Saved: React.FC<SavedProps> = ({ savedPosts }) => {
  const dispatch = useDispatch<AppDispatch>()

  const handleDeletePost = (postId: string) => {
    dispatch(removePost(postId))
  }

  return (
    <div className="post-list">
      {savedPosts.map((post) => (
        <PostItem key={post.id} post={post} onDelete={handleDeletePost} />
      ))}
    </div>
  )
}

export default Saved
