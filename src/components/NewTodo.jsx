import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { todosAPI } from '../utils/api'
import './NewTodo.css'

const NewTodo = () => {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!text.trim()) {
      setError('Please enter a todo item')
      return
    }

    setLoading(true)

    try {
      await todosAPI.create(text.trim())
      // Navigate back to /todo after successful creation
      navigate('/todo')
    } catch (error) {
      setError(error.message || 'Failed to create todo. Please try again.')
      console.error('Error creating todo:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/todo')
  }

  return (
    <div className="new-todo-container">
      <div className="new-todo-card">
        <div className="new-todo-header">
          <h1>Add New Todo</h1>
          <p>Create a new todo item</p>
        </div>

        <form onSubmit={handleSubmit} className="new-todo-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="todo-text">Todo Text</label>
            <textarea
              id="todo-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your todo item..."
              rows="5"
              className="todo-textarea"
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Todo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTodo

