import React from 'react'
import { Send, X } from 'lucide-react'
import Form from '../Form/Form'
import { Input } from '../Input'
import { Button } from '../Button'

type CommentFormProps = {
  onAddComment: (comment: string) => void
  responseTo: string | null
  setResponseTo: (commentId: string | null) => void
}

const CommentForm: React.FC<CommentFormProps> = ({
  onAddComment,
  responseTo,
  setResponseTo,
}) => {
  const initialValues = { comment: '' }

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      await onAddComment(values.comment as string)
    } catch (error) {
      console.error('An error occurred while submitting the form: ' + error)
    }
  }

  return (
    <div className="bg-bg-secondary">
      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        submitButton={false}
      >
        {responseTo && (
          <div className="flex items-center mb-2 p-2 bg-bg-secondary rounded-md">
            <span className="text-sm text-text-secondary mr-2">
              Answering a comment of {responseTo}...
            </span>
            <button
              type="button"
              onClick={() => setResponseTo(null)}
              className="text-text-secondary hover:text-text-tertiary"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex items-center w-full p-2">
          <div className="flex-grow">
            <Input
              name="comment"
              placeholder="Write a comment..."
              className="w-full p-2 rounded-md border border-border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button
            className="bg-primary text-text-primary p-2 rounded-md hover:bg-primary-hover transition-colors ml-2"
            type="submit"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default CommentForm
