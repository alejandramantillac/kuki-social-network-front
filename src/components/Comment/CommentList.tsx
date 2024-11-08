import React from 'react'
import { Comment } from '../../types/model'
import CommentItem from './CommentItem'
import { Spinner } from '../Spinner'

type CommentListProps = {
  comments: Comment[]
  loading: boolean
}

const CommentList: React.FC<CommentListProps> = ({ comments, loading }) => {
  return (
    <div className="flex-grow overflow-y-auto p-4 space-y-4">
      {loading ? (
        <Spinner />
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))
      )}
    </div>
  )
}

export default CommentList
