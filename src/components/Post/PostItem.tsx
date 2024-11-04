import React from 'react'
import PostHeader from './PostHeader'
import PostImage from './PostImage'
import PostDescription from './PostDescription'
import PostFooter from './PostFooter'
import { Post } from '../../types/model'

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="post-item bg-bg-primary shadow-md rounded-lg overflow-hidden mb-4">
      <PostHeader title={post.title} author={post.author} />
      <PostImage src={post.image} />
      <PostDescription description={post.description} />
      <PostFooter comments={post.comments} likes={post.likes} />
    </div>
  )
}

export default PostItem
