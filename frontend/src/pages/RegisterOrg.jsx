import { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function RegisterOrg() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    orgName: '',
    adminName: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/auth/register', data)
    navigate('/')
  }

  return (
    <div>
      <h2>Register Organisation</h2>

      <form onSubmit={handleSubmit}>
        <input name="orgName" placeholder="Organisation Name" onChange={handleChange} />
        <input name="adminName" placeholder="Admin Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button>Create</button>
      </form>
    </div>
  )
}
