import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostItem from './PostItem'
import { RootState, AppDispatch } from '../../store/store'
import {
  fetchPosts,
  incrementPage,
  removePost,
} from '../../store/slices/postSlice'
import { Spinner } from '../Spinner'
import NoMoreContent from '../NoMoreContent'
import { PostListProps } from '../../types/props'

const PostList: React.FC<PostListProps> = ({ filters = undefined }) => {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, loading, hasMore, page } = useSelector(
    (state: RootState) => state.post
  )

  useEffect(() => {
    dispatch(fetchPosts({ filters, page }))
  }, [dispatch, filters, page])

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return
    }
    dispatch(incrementPage())
  }, [dispatch, loading])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const handleDeletePost = (postId: string) => {
    dispatch(removePost(postId))
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onDelete={handleDeletePost} />
      ))}
      {loading && <Spinner />}
      {!hasMore && <NoMoreContent />}
    </div>
  )
}

export default PostList
