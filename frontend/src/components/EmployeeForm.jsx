import { useState } from 'react'
import api from '../services/api'

export default function EmployeeForm({ close, reload }) {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/employees', data)
    reload()
    close()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="First Name"
        onChange={(e) => setData({ ...data, first_name: e.target.value })} />

      <input placeholder="Last Name"
        onChange={(e) => setData({ ...data, last_name: e.target.value })} />

      <input placeholder="Email"
        onChange={(e) => setData({ ...data, email: e.target.value })} />

      <input placeholder="Phone"
        onChange={(e) => setData({ ...data, phone: e.target.value })} />

      <button>Save</button>
    </form>
  )
}
