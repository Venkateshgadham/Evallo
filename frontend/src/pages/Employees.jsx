import { useEffect, useState } from 'react'
import api from '../services/api'
import EmployeeForm from '../components/EmployeeForm'

export default function Employees() {     // <--- MUST BE HERE
  const [employees, setEmployees] = useState([])
  const [showForm, setShowForm] = useState(false)

  const load = async () => {
    const res = await api.get('/employees')
    setEmployees(res.data)
  }

  useEffect(() => {
    load()
  }, [])

  const handleDelete = async (id) => {
    await api.delete(`/employees/${id}`)
    load()
  }

  return (
    <div>
      <h2>Employees</h2>
      <button onClick={() => setShowForm(true)}>+ Add Employee</button>

      {showForm && <EmployeeForm close={() => setShowForm(false)} reload={load} />}

      <ul>
        {employees.map((e) => (
          <li key={e.id}>
            {e.first_name} {e.last_name} — {e.email}
            <button onClick={() => handleDelete(e.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
