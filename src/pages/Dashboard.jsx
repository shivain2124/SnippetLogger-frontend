import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { snippetService } from '../services/snippetService'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [snippets, setSnippets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch snippets when component loads
  useEffect(() => {
    fetchSnippets()
  }, [])

  const fetchSnippets = async () => {
    try {
      setLoading(true)
      const data = await snippetService.getAllSnippets()
      console.log('Fetched snippets:', data)
      setSnippets(data.snippets || data)
    } catch (err) {
      console.error('Error fetching snippets:', err)
      setError('Failed to load snippets')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (snippetId) => {
    navigate(`/edit-snippet/${snippetId}`)
  }

  const handleDelete = async (snippetId, snippetTitle) => {
    if (window.confirm(`Are you sure you want to delete "${snippetTitle}"?`)) {
      try {
        console.log('Deleting snippet:', snippetId)
        await snippetService.deleteSnippet(snippetId)
        console.log('Snippet deleted successfully')
        // Remove from local state to update UI immediately
        setSnippets(snippets.filter(snippet => snippet._id !== snippetId))
      } catch (err) {
        console.error('Error deleting snippet:', err)
        alert('Failed to delete snippet')
      }
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">SnippetLogger</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Code Snippets</h2>
            <button 
              onClick={() => navigate('/add-snippet')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              + Add Snippet
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="text-gray-500">Loading snippets...</div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Snippets List */}
          {!loading && !error && (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              {snippets.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No snippets yet. Create your first one!</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {snippets.map((snippet) => (
                    <li key={snippet._id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {snippet.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Language: {snippet.language}
                          </p>
                          <p className="text-sm text-gray-400">
                            Created: {new Date(snippet.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEdit(snippet._id)}
                            className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(snippet._id, snippet.title)}
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      {/* Code Preview */}
                      <div className="mt-2">
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                          <code>{snippet.code.substring(0, 200)}{snippet.code.length > 200 ? '...' : ''}</code>
                        </pre>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
