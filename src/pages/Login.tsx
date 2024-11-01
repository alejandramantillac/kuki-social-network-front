import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const authContext = useContext(AuthContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (authContext) {
        const user = await authContext.login(username, password)
        if (!user) {
          setError('Invalid username or password')
        }
      }
    } catch {
      setError('An error occurred during login')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
