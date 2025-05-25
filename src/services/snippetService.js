import api from './api'

export const snippetService = {
  // Get all user's snippets
  getAllSnippets: async () => {
    const response = await api.get('/snippets')
    return response.data
  },

  // Get single snippet by ID
  getSnippet: async (id) => {
    const response = await api.get(`/snippets/${id}`)
    return response.data
  },

  // Create new snippet
  createSnippet: async (snippetData) => {
    const response = await api.post('/snippets', snippetData)
    return response.data
  },

  // Update existing snippet
  updateSnippet: async (id, snippetData) => {
    const response = await api.put(`/snippets/${id}`, snippetData)
    return response.data
  },

  // Delete snippet
  deleteSnippet: async (id) => {
    const response = await api.delete(`/snippets/${id}`)
    return response.data
  }
}
