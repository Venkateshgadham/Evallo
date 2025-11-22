import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import RegisterOrg from './pages/RegisterOrg'
import Employees from './pages/Employees'
import Teams from './pages/Teams'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<RegisterOrg />} />

      {/* Protected Routes */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        }
      />

      <Route
        path="/teams"
        element={
          <ProtectedRoute>
            <Teams />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
