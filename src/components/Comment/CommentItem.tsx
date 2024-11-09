import React, { useState } from 'react'
import { Comment } from '../../types/model'
import { Spinner } from '../Spinner'
import commentService from '../../services/commentService'
import authService from '../../services/authService'
import SubCommentItem from './SubCommentItem'
import CommentActions from './CommentActions'
import CommentHeader from './CommentHeader'

type CommentItemProps = {
  comment: Comment
  setResponseTo: (commentId: string) => void
  onDelete: (commentId: string) => void
  isChild?: boolean
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  setResponseTo,
  onDelete,
  isChild = false,
}) => {
  const [showReplies, setShowReplies] = useState(false)
  const [replies, setReplies] = useState<Comment[]>(comment.replies || [])
  const [loadingReplies, setLoadingReplies] = useState(false)
  const isAuthor = authService.getUser()?.username === comment.user.username

  const toggleReplies = async () => {
    if (!showReplies && replies.length === 0) {
      setLoadingReplies(true)
      const data = await commentService.getSubComments(comment.commentId)
      setReplies(data)
      setLoadingReplies(false)
    }
    setShowReplies(!showReplies)
  }

  const handleDelete = async (commentId: string) => {
    await onDelete(commentId)
    setReplies((prevReplies) =>
      prevReplies.filter((reply) => reply.commentId !== commentId)
    )
  }

  return (
    <div
      className={`bg-bg-secondary rounded-lg p-4 ${isChild ? 'ml-4 mt-2' : ''}`}
    >
      <CommentHeader
        photoUrl={comment.user.photoUrl}
        username={comment.user.username}
        creationDate={comment.creationDate}
      />
      <p className="text-text-secondary mt-2 break-words">{comment.content}</p>
      {!isChild && (
        <CommentActions
          isSubComment={false}
          isAuthor={isAuthor}
          showReplies={showReplies}
          onAnswer={() => setResponseTo(comment.commentId)}
          onDelete={() => handleDelete(comment.commentId)}
          onToggleReplies={toggleReplies}
        />
      )}
      {showReplies && (
        <div className="mt-4 space-y-2">
          {loadingReplies ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            replies.map((reply) => (
              <SubCommentItem
                key={reply.commentId}
                comment={reply}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default CommentItem
