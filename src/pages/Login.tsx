import { JSX } from 'react'
import { ChefHat } from 'lucide-react'
import LoginForm from '../components/Form/LoginForm'
import LinkedText from '../components/LinkedText'

/**
 * Login page to authenticate users.
 * @returns {JSX.Element} The rendered Login component.
 * @example
 * return <Login />
 */
export default function Login(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-tertiary flex items-center justify-center p-4">
      <div className="bg-bg-primary p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-8">
          <ChefHat className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-center text-text-tertiary mb-8">
          Bienvenido a Kuki
        </h1>
        <LoginForm />
        <div className="mt-6 text-center">
          <LinkedText href="#" text="¿Olvidaste tu contraseña?" />
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">¿No tienes una cuenta? </span>
          <LinkedText href="#" text="Regístrate" />
        </div>
      </div>
    </div>
  )
}
