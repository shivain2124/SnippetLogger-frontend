import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddSnippet from './pages/AddSnippet'
import EditSnippet from './pages/EditSnippet'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/add-snippet" 
        element={
          <ProtectedRoute>
            <AddSnippet />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit-snippet/:id" 
        element={
          <ProtectedRoute>
            <EditSnippet />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App
