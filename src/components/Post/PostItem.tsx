import React, { useState, useContext } from 'react'
import { Recipe } from '../../types/model'
import PostImage from './PostImage'
import PostHeader from './PostHeader'
import PostDescription from './PostDescription'
import PostFooter from './PostFooter'
import { Clock, Globe, Trash } from 'lucide-react'
import PostTags from './PostTags'
import { formatDuration } from '../../utils/timeUtils'
import { AuthContext } from '../../context/AuthContext'
import postService from '../../services/postService'
import { Button } from '../Button'
import { Modal } from '../Modal/Modal'
import RequireAdmin from '../RequireAdmin'

const PostItem: React.FC<{
  post: Recipe
  onDelete: (postId: string) => void
}> = ({ post, onDelete }) => {
  const authContext = useContext(AuthContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDelete = async () => {
    try {
      console.log('Deleting post with ID:', post.id)
      await postService.deletePost(post.id)
      onDelete(post.id)
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  if (!authContext) {
    return null
  }

  return (
    <article className="bg-bg-primary shadow-md rounded-lg overflow-hidden mb-6 transition-shadow hover:shadow-lg relative">
      <PostImage
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
        <RequireAdmin>
          <Button
            variant="none"
            size="sm"
            className="absolute bottom-4 right-4 text-orange-500"
            onClick={() => setIsModalOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </RequireAdmin>
        <PostFooter
          likes={post.likes}
          comments={post.comments}
          userLiked={post.likedByUser}
          postId={post.id}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete this post?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </article>
  )
}

export default PostItem
