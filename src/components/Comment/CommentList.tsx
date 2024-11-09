import React from 'react'
import { Comment } from '../../types/model'
import CommentItem from './CommentItem'
import { Spinner } from '../Spinner'

type CommentListProps = {
  comments: Comment[]
  loading: boolean
  setResponseTo: (commentId: string) => void
  onDelete: (commentId: string) => void
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  loading,
  setResponseTo,
  onDelete,
}) => {
  return (
    <div className="flex-grow p-4 space-y-4">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            setResponseTo={setResponseTo}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  )
}

export default CommentList
