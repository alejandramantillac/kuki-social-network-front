import { JSX } from 'react'
import { ChefHat } from 'lucide-react'
import RegisterForm from '../components/Form/RegisterForm'
import LinkedText from '../components/LinkedText'

/**
 * Register page to create new user accounts.
 * @returns {JSX.Element} The rendered Register component.
 * @example
 * return <Register />
 */
export default function Register(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-tertiary flex items-center justify-center p-4">
      <div className="bg-bg-primary p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-8">
          <ChefHat className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-center text-text-tertiary mb-8">
          Regístrate en Kuki
        </h1>
        <RegisterForm />
        <div className="mt-6 text-center">
          <span className="text-sm text-gray-600">¿Ya tienes una cuenta? </span>
          <LinkedText href="/login" text="Inicia sesión" />
        </div>
      </div>
    </div>
  )
}
