import api from './api'

export const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  // Refresh access token
  refreshToken: async (refreshToken) => {
    const response = await api.post('/auth/refresh', { refreshToken })
    return response.data
  },

  // Logout user
  logout: async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await api.post('/auth/logout', { refreshToken })
    return response.data
  },

  // Get current user profile
  getMe: async () => {
    const response = await api.get('/auth/me')
    return response.data
  }
}
