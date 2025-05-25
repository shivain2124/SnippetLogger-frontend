import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    const userEmail = localStorage.getItem('userEmail')
    console.log('Initial token check:', { token, userEmail })
    
    if (token && userEmail) {
      setUser({ email: userEmail, token })
    }
    setLoading(false)
  }, [])

  const login = (userData, tokens) => {
    console.log('Login called with:', userData, tokens)
    localStorage.setItem('accessToken', tokens.accessToken)
    localStorage.setItem('refreshToken', tokens.refreshToken)
    localStorage.setItem('userEmail', userData.email)
    setUser(userData)
    console.log('User state updated to:', userData)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userEmail')
    setUser(null)
  }

  console.log('AuthContext current state:', { user, loading })

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
