import { useEffect, useState } from 'react'
import api from '../services/api'
import TeamForm from '../components/TeamForm'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [showForm, setShowForm] = useState(false)

  const load = async () => {
    const res = await api.get('/teams')
    setTeams(res.data)
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {
    await api.delete(`/teams/${id}`)
    load()
  }

  return (
    <div>
      <h2>Teams</h2>

      <button onClick={() => setShowForm(true)}>+ Add Team</button>

      {showForm && <TeamForm close={() => setShowForm(false)} reload={load} />}

      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            {team.name}
            <button onClick={() => handleDelete(team.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
