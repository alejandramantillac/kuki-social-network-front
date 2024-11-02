import React, { useContext, JSX } from 'react'
import Form from './Form'
import { Input } from '../Input'
import { AuthContext } from '../../context/AuthContext'
import { Navigate } from 'react-router-dom'

/**
 * LoginForm component to display a login form.
 * @returns {JSX.Element} The rendered LoginForm component.
 * @example
 * <LoginForm />
 */
const LoginForm: React.FC = (): JSX.Element => {
  const authContext = useContext(AuthContext)
  const initialValues = {
    username: null,
    password: null,
  }

  const validate = (values: Record<string, unknown>) => {
    const errors: Record<string, string> = {}
    if (!values.username || (values.username as string).length === 0) {
      errors.username = 'Username is required'
    }
    if (!values.password || (values.password as string).length === 0) {
      errors.password = 'Password is required'
    }
    return errors
  }

  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      if (authContext) {
        const user = await authContext.login(
          data.username as string,
          data.password as string
        )
        if (user) {
          ;<Navigate to="/dashboard" replace />
        } else {
          console.log('Invalid username or password')
        }
      }
    } catch (error) {
      console.error('An error occurred while submitting the form: ' + error)
    }
  }

  return (
    <Form
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      submitText="Iniciar Sesión"
    >
      <Input name="username" label="Usuario" />
      <Input name="password" label="Contraseña" type="password" />
    </Form>
  )
}

export default LoginForm
