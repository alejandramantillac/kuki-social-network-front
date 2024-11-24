import React, { useEffect, useState, useCallback } from 'react'
import PostItem from './PostItem'
import postService from '../../services/postService'
import { Recipe } from '../../types/model'
import { Spinner } from '../Spinner'
import NoMoreContent from '../NoMoreContent'
import { PostListProps } from '../../types/props'

const PostList: React.FC<PostListProps> = ({ filters = undefined }) => {
  const [posts, setPosts] = useState<Recipe[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const data = await postService.getPosts(filters, page, 10)
      setPosts((prevPosts) => {
        const allPosts = [...prevPosts, ...data]
        const uniquePosts = Array.from(
          new Set(allPosts.map((post) => post.id))
        ).map((id) => allPosts.find((post) => post.id === id))
        return uniquePosts as Recipe[]
      })
      setHasMore(data.length > 0)
      setLoading(false)
    }
    fetchPosts()
  }, [page, filters])

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return
    }
    setPage((prevPage) => prevPage + 1)
  }, [loading])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      {loading && <Spinner />}
      {!hasMore && <NoMoreContent />}
    </div>
  )
}

export default PostList
