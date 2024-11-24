import React from 'react'
import { Recipe } from '../../types/model'
import PostImage from './PostImage'
import PostHeader from './PostHeader'
import PostDescription from './PostDescription'
import PostFooter from './PostFooter'
import { Clock, Globe } from 'lucide-react'
import PostTags from './PostTags'
import { formatDuration } from '../../utils/timeUtils'

const PostItem: React.FC<{ post: Recipe }> = ({ post }) => {
  return (
    <article className="bg-bg-primary shadow-md rounded-lg overflow-hidden mb-6 transition-shadow hover:shadow-lg">
      <PostImage
        postId={post.id}
        src={post.photoUrl}
        userSaved={post.savedByUser}
        difficulty={post.difficulty}
      />
      <div className="p-4">
        <PostHeader
          title={post.title}
          author={post.recipeOwner.username}
          authorAvatar={post.recipeOwner.photoUrl}
        />
        <PostDescription description={post.description} />
        <PostTags tags={post.tags} />
        <div className="flex items-center text-sm text-text-secondary mb-4">
          <Clock className="w-4 h-4 mr-1" />
          <span className="mr-4">{formatDuration(post.estimatedTime!)}</span>
          <Globe className="w-4 h-4 mr-1" />
          <span>{post.country.name}</span>
        </div>
        <PostFooter
          likes={post.likes}
          comments={post.comments}
          userLiked={post.likedByUser}
          postId={post.id}
        />
      </div>
    </article>
  )
}

export default PostItem
