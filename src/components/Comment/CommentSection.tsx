import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import commentService from '../../services/commentService'
import { Comment } from '../../types/model'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

type CommentSectionProps = {
  postId: string
  onClose: () => void
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      const data = await commentService.getComments(postId)
      setComments(data)
      setLoading(false)
    }
    fetchComments()
  }, [postId])

  const handleAddComment = (comment: string) => {
    console.log('Nuevo comentario:', comment)
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isVisible])

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 bg-black opacity-50 z-30"></div>
      )}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-bg-primary shadow-lg transform transition-transform duration-300 ease-in-out ${isVisible ? 'slide-in-right' : 'slide-out-right'} rounded-l-lg`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-border-secondary">
            <h2 className="text-lg font-semibold text-text-tertiary">
              Comments
            </h2>
            <button
              onClick={handleClose}
              className="text-text-secondary hover:text-text-tertiary"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <CommentList comments={comments} loading={loading} />

          <CommentForm onAddComment={handleAddComment} />
        </div>
      </div>
    </>
  )
}

export default CommentSection
