import React from 'react'
import { Trash, Reply, ChevronDown, ChevronUp } from 'lucide-react'

type CommentActionsProps = {
  isSubComment: boolean
  isAuthor: boolean
  showReplies: boolean
  onAnswer: () => void
  onDelete: () => void
  onToggleReplies: () => void
}

const CommentActions: React.FC<CommentActionsProps> = ({
  isSubComment,
  isAuthor,
  showReplies,
  onAnswer,
  onDelete,
  onToggleReplies,
}) => {
  return (
    <div className="flex justify-end space-x-2 mt-2">
      {!isSubComment && (
        <button
          className="text-text-secondary hover:text-text-tertiary transition-colors"
          onClick={onAnswer}
        >
          <Reply className="w-4 h-4" />
        </button>
      )}
      {isAuthor && (
        <button
          className="text-text-secondary hover:text-text-tertiary transition-colors"
          onClick={onDelete}
        >
          <Trash className="w-4 h-4" />
        </button>
      )}
      {!isSubComment && (
        <button
          className="text-text-secondary hover:text-text-tertiary transition-colors flex text-sm items-center"
          onClick={onToggleReplies}
        >
          {showReplies ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
          Replies
        </button>
      )}
    </div>
  )
}

export default CommentActions
