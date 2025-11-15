import express from 'express'
import { authenticateToken } from './auth.js'
import { getTodos, saveTodos } from '../utils/database.js'

const router = express.Router()

// All todo routes require authentication
router.use(authenticateToken)

// Get all todos for the authenticated user
router.get('/', (req, res) => {
  try {
    const todos = getTodos(req.user.userId)
    res.json({
      success: true,
      todos
    })
  } catch (error) {
    console.error('Get todos error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    })
  }
})

// Get a specific todo by ID
router.get('/:id', (req, res) => {
  try {
    const todos = getTodos(req.user.userId)
    const todo = todos.find(t => t.id === req.params.id)

    if (!todo) {
      return res.status(404).json({ 
        success: false, 
        message: 'Todo not found' 
      })
    }

    res.json({
      success: true,
      todo
    })
  } catch (error) {
    console.error('Get todo error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    })
  }
})

// Create a new todo
router.post('/', (req, res) => {
  try {
    const { text } = req.body

    if (!text || !text.trim()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todo text is required' 
      })
    }

    const todos = getTodos(req.user.userId)
    
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      userId: req.user.userId
    }

    todos.push(newTodo)
    saveTodos(req.user.userId, todos)

    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      todo: newTodo
    })
  } catch (error) {
    console.error('Create todo error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    })
  }
})

// Update a todo
router.put('/:id', (req, res) => {
  try {
    const { text, completed } = req.body
    const todos = getTodos(req.user.userId)
    const todoIndex = todos.findIndex(t => t.id === req.params.id)

    if (todoIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Todo not found' 
      })
    }

    // Update todo
    if (text !== undefined) {
      todos[todoIndex].text = text.trim()
    }
    if (completed !== undefined) {
      todos[todoIndex].completed = completed
    }
    todos[todoIndex].updatedAt = new Date().toISOString()

    saveTodos(req.user.userId, todos)

    res.json({
      success: true,
      message: 'Todo updated successfully',
      todo: todos[todoIndex]
    })
  } catch (error) {
    console.error('Update todo error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    })
  }
})

// Toggle todo completion
router.patch('/:id/toggle', (req, res) => {
  try {
    const todos = getTodos(req.user.userId)
    const todoIndex = todos.findIndex(t => t.id === req.params.id)

    if (todoIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Todo not found' 
      })
    }

    todos[todoIndex].completed = !todos[todoIndex].completed
    todos[todoIndex].updatedAt = new Date().toISOString()

    saveTodos(req.user.userId, todos)

    res.json({
      success: true,
      message: 'Todo toggled successfully',
      todo: todos[todoIndex]
    })
  } catch (error) {
    console.error('Toggle todo error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    })
  }
})

// Delete a todo
router.delete('/:id', (req, res) => {
  try {
    const todos = getTodos(req.user.userId)
    const filteredTodos = todos.filter(t => t.id !== req.params.id)

    if (todos.length === filteredTodos.length) {
      return res.status(404).json({ 
        success: false, 
        message: 'Todo not found' 
      })
    }

    saveTodos(req.user.userId, filteredTodos)

    res.json({
      success: true,
      message: 'Todo deleted successfully'
    })
  } catch (error) {
    console.error('Delete todo error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    })
  }
})

// Delete all completed todos
router.delete('/completed/all', (req, res) => {
  try {
    const todos = getTodos(req.user.userId)
    const activeTodos = todos.filter(t => !t.completed)

    saveTodos(req.user.userId, activeTodos)

    res.json({
      success: true,
      message: 'Completed todos deleted successfully',
      deletedCount: todos.length - activeTodos.length
    })
  } catch (error) {
    console.error('Delete completed todos error:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    })
  }
})

export default router

