import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import TodoList from './components/TodoList'
import NewTodo from './components/NewTodo'
import { isAuthenticated } from './utils/auth'
import { authAPI } from './utils/api'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const authUser = localStorage.getItem('currentUser')
    if (authUser) {
      setUser(JSON.parse(authUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    authAPI.logout()
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated() ? <Navigate to="/todo" /> : <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/signup" 
          element={
            isAuthenticated() ? <Navigate to="/todo" /> : <Signup onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/todo" 
          element={
            isAuthenticated() ? (
              <TodoList user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/todo/new" 
          element={
            isAuthenticated() ? (
              <NewTodo />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App


