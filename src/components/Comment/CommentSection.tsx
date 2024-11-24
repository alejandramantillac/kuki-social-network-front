import React, { useState, useEffect, useCallback, useRef } from 'react'
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
  const [responseTo, setResponseTo] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const commentIds = useRef<Set<string>>(new Set())

  const fetchComments = useCallback(async () => {
    setLoading(true)
    const data = await commentService.getComments(postId, page)
    const newComments = data.filter(
      (comment) => !commentIds.current.has(comment.commentId)
    )
    newComments.forEach((comment) => commentIds.current.add(comment.commentId))
    setComments((prevComments) => [...prevComments, ...newComments])
    setHasMore(data.length > 0)
    setLoading(false)
  }, [postId, page])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleAddComment = async (comment: string) => {
    try {
      const newComment = await commentService.addComment(postId, {
        content: comment,
        parentCommentId: responseTo,
      })
      if (responseTo) {
        setComments((prevComments) =>
          prevComments.map((c) =>
            c.commentId === responseTo
              ? { ...c, replies: [...[newComment]] }
              : c
          )
        )
      } else {
        setComments([...comments, newComment])
      }
      setResponseTo(null)
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const onDelete = async (commentId: string) => {
    try {
      await commentService.deleteComment(commentId)
      setComments((prevComments) =>
        prevComments
          .map((comment) => ({
            ...comment,
            replies: [],
          }))
          .filter((comment) => comment.commentId !== commentId)
      )
      commentIds.current.delete(commentId)
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  const userOfComment = (id: string | null): string | null => {
    if (!id) return null
    return (
      comments.find((comment) => comment.commentId === id)?.user.username ||
      null
    )
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

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [loading, hasMore])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      return () => {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [handleScroll])

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

          <div className="flex-grow overflow-y-auto" ref={containerRef}>
            <CommentList
              comments={comments}
              loading={loading}
              setResponseTo={setResponseTo}
              onDelete={onDelete}
            />
          </div>

          <CommentForm
            onAddComment={handleAddComment}
            responseTo={userOfComment(responseTo)}
            setResponseTo={setResponseTo}
          />
        </div>
      </div>
    </>
  )
}

export default CommentSection
