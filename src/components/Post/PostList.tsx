import React, { useEffect, useState } from 'react'
import PostItem from './PostItem'
import { Post } from '../../types/model'
import postService from '../../services/postService'

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await postService.getPosts()
      setPosts(data)
    }
    fetchPosts()
  }, [])

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList
