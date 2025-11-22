import { useState } from 'react'
import api from '../services/api'

export default function TeamForm({ close, reload }) {
  const [data, setData] = useState({
    name: '',
    description: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/teams', data)
    reload()
    close()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Team Name"
        onChange={(e) => setData({ ...data, name: e.target.value })} />

      <input placeholder="Description"
        onChange={(e) => setData({ ...data, description: e.target.value })} />

      <button>Save</button>
    </form>
  )
}
