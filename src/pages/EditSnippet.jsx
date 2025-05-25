import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { snippetService } from '../services/snippetService'

function EditSnippet() {
  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [loading, setLoading] = useState(false)
  const [loadingSnippet, setLoadingSnippet] = useState(true)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()
  const { id } = useParams() // Get snippet ID from URL

  // Load snippet data when component mounts
  useEffect(() => {
    fetchSnippet()
  }, [id])

  const fetchSnippet = async () => {
    try {
      setLoadingSnippet(true)
      console.log('Fetching snippet with ID:', id)
      const data = await snippetService.getSnippet(id)
      console.log('Fetched snippet:', data)
      
      const snippet = data.snippet || data
      setTitle(snippet.title)
      setCode(snippet.code)
      setLanguage(snippet.language)
    } catch (err) {
      console.error('Error fetching snippet:', err)
      setError('Failed to load snippet')
    } finally {
      setLoadingSnippet(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('Updating snippet:', { title, code, language })
      await snippetService.updateSnippet(id, { title, code, language })
      console.log('Snippet updated successfully')
      navigate('/dashboard')
    } catch (err) {
      console.error('Error updating snippet:', err)
      setError(err.response?.data?.message || 'Failed to update snippet')
    } finally {
      setLoading(false)
    }
  }

  if (loadingSnippet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading snippet...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Edit Snippet</h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter snippet title"
                />
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="sql">SQL</option>
                  <option value="bash">Bash</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Code
                </label>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  rows={15}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="Paste your code here..."
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Snippet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditSnippet
