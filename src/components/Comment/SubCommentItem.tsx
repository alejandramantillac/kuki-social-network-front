import React from 'react'
import { Comment } from '../../types/model'
import authService from '../../services/authService'
import CommentActions from './CommentActions'
import CommentHeader from './CommentHeader'

type SubCommentItemProps = {
  comment: Comment
  onDelete: (commentId: string) => void
}

const SubCommentItem: React.FC<SubCommentItemProps> = ({
  comment,
  onDelete,
}) => {
  const isAuthor = authService.getUser()?.username === comment.user.username

  return (
    <div className="bg-bg-tertiary rounded-lg p-3">
      <CommentHeader
        photoUrl={comment.user.photoUrl}
        username={comment.user.username}
        creationDate={comment.creationDate}
      />
      <p className="text-text-secondary mt-2">{comment.content}</p>
      {isAuthor && (
        <CommentActions
          isSubComment={true}
          isAuthor={isAuthor}
          showReplies={false}
          onAnswer={() => {}}
          onDelete={() => onDelete(comment.commentId)}
          onToggleReplies={() => {}}
        />
      )}
    </div>
  )
}

export default SubCommentItem
