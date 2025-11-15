import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TodoItem from './TodoItem'
import { todosAPI } from '../utils/api'
import './TodoList.css'

const TodoList = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all') // all, active, completed
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    try {
      setLoading(true)
      setError('')
      const fetchedTodos = await todosAPI.getAll()
      setTodos(fetchedTodos)
    } catch (error) {
      setError('Failed to load todos. Please try again.')
      console.error('Error loading todos:', error)
    } finally {
      setLoading(false)
    }
  }


  const toggleTodo = async (id) => {
    try {
      const updatedTodo = await todosAPI.toggle(id)
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ))
      setError('')
    } catch (error) {
      setError('Failed to update todo. Please try again.')
      console.error('Error toggling todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await todosAPI.delete(id)
      setTodos(todos.filter(todo => todo.id !== id))
      setError('')
    } catch (error) {
      setError('Failed to delete todo. Please try again.')
      console.error('Error deleting todo:', error)
    }
  }

  const editTodo = async (id, newText) => {
    try {
      const updatedTodo = await todosAPI.update(id, { text: newText })
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ))
      setError('')
    } catch (error) {
      setError('Failed to update todo. Please try again.')
      console.error('Error editing todo:', error)
    }
  }

  const clearCompleted = async () => {
    try {
      await todosAPI.deleteCompleted()
      setTodos(todos.filter(todo => !todo.completed))
      setError('')
    } catch (error) {
      setError('Failed to clear completed todos. Please try again.')
      console.error('Error clearing completed todos:', error)
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="todo-container">
      <div className="todo-header">
        <div className="user-info">
          <h1>My Todos</h1>
          <p className="user-email">{user.email}</p>
        </div>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="todo-card">
        {error && <div className="error-message" style={{ marginBottom: '16px' }}>{error}</div>}
        
        <div className="todo-actions-header">
          <button 
            onClick={() => navigate('/todo/new')} 
            className="add-button"
          >
            + Add Todo
          </button>
        </div>

        <div className="todo-filters">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button
            className={`filter-button ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({activeCount})
          </button>
          <button
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </button>
        </div>

        <div className="todo-list">
          {loading ? (
            <div className="empty-state">
              <p>Loading todos...</p>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p>No todos found. Add one to get started!</p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>

        {completedCount > 0 && (
          <div className="todo-footer">
            <button onClick={clearCompleted} className="clear-button">
              Clear Completed ({completedCount})
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoList


