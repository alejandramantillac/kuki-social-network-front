import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

type ShowRepliesButtonProps = {
  showReplies: boolean
  onToggleReplies: () => void
}

const ShowRepliesButton: React.FC<ShowRepliesButtonProps> = ({
  showReplies,
  onToggleReplies,
}) => {
  return (
    <button
      className="flex items-center text-text-secondary hover:text-text-tertiary"
      onClick={onToggleReplies}
    >
      {showReplies ? (
        <>
          <ChevronUp className="w-4 h-4 mr-1" />
          Replies
        </>
      ) : (
        <>
          <ChevronDown className="w-4 h-4 mr-1" />
          Replies
        </>
      )}
    </button>
  )
}

export default ShowRepliesButton
