import React from 'react'
import { ChefHat, ArrowLeft } from 'lucide-react'
import { Button } from '../components/Button'

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bg-secondary flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <ChefHat className="h-24 w-24 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-text-tertiary mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-text-secondary mb-4">
          Page not found
        </h2>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Button
          onClick={() => window.history.back()}
          variant="primary"
          size="md"
          className="inline-flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back
        </Button>
      </div>
      <div className="mt-12 text-center">
        <p className="text-sm text-text-secondary">
          Need help?{' '}
          <a href="/contact" className="text-primary hover:underline">
            Contact us
          </a>
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
