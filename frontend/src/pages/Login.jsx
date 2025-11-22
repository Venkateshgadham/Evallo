import { useState } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')     // 🔥 ADD ERROR STATE
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("") // clear old error

    try {
      const res = await api.post('/auth/login', { email, password })
      login(res.data.token)
      navigate('/employees')
    } catch (err) {
      console.error(err)
      setError("Invalid credentials")    // 🔥 SHOW ERROR IN SCREEN
    }
  }

  return (
    <div className="page-container">
      <h2>Login</h2>

      {/* 🔥 ERROR MESSAGE BOX */}
      {error && (
        <div className="error-box">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>

      <button className="secondary-btn" onClick={() => navigate('/register')}>
        Create Organisation
      </button>
    </div>
  )
}
