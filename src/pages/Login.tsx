import { ChefHat } from 'lucide-react'
import LoginForm from '../components/Form/LoginForm'

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-8">
          <ChefHat className="h-12 w-12 text-orange-500" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Bienvenido a Kuki
        </h1>
        <LoginForm />
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-orange-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">¿No tienes una cuenta? </span>
          <a href="#" className="text-sm text-orange-600 hover:underline">
            Regístrate
          </a>
        </div>
      </div>
    </div>
  )
}
