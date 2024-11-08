import React from 'react'
import { Send } from 'lucide-react'
import Form from '../Form/Form'
import Input from '../Input'
import Button from '../Button'

type CommentFormProps = {
  onAddComment: (comment: string) => void
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const initialValues = { comment: '' }

  const handleSubmit = (values: { [key: string]: string }) => {
    if (values.comment.trim()) {
      onAddComment(values.comment)
    }
  }

  return (
    <Form initialValues={initialValues} onSubmit={handleSubmit} submitText="">
      <Input name="comment" placeholder="Write a comment..." />
      <Button className="bg-primary text-text-primary p-2 rounded-md hover:bg-primary-hover transition-colors">
        <Send className="w-5 h-5" />
      </Button>
    </Form>
  )
}

export default CommentForm
