import React, { useState } from 'react'
import { Button } from '../Button'
import { Spinner } from '../Spinner'
import { FormProps } from '../../types/types'

/**
 * Form component to handle form state and validation.
 * @param {FormProps} props - The properties for the Form component.
 * @param {Record<string, string>} props.initialValues - The initial values for the form fields.
 * @param {(values: Record<string, string>) => Record<string, string>} [props.validate] - The validation function for the form fields.
 * @param {string} [props.submitText='Submit'] - The text to display on the submit button.
 * @param {(data: Record<string, string>) => Promise<void>} props.onSubmit - The function to call when the form is submitted.
 * @param {React.ReactNode} props.children - The content to display inside the form.
 * @returns {JSX.Element} The rendered Form component.
 */
const Form: React.FC<FormProps> = ({
  onSubmit,
  initialValues,
  validate,
  children,
  submitText = 'Submit',
}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
      if (Object.keys(validationErrors).length > 0) {
        return
      }
    }
    setIsSubmitting(true)
    try {
      await onSubmit(values)
    } catch (error) {
      console.error('An error occurred while submitting the form: ' + error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.props.name) {
          return React.cloneElement(
            child as React.ReactElement<typeof child.props>,
            {
              onChange: handleChange,
              value: values[child.props.name] || '',
              errors: errors[child.props.name],
            }
          )
        }
        return child
      })}
      <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
        {isSubmitting ? <Spinner /> : submitText}
      </Button>
    </form>
  )
}

export default Form
