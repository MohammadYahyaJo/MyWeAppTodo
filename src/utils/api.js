const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Helper function to get auth token from localStorage
function getToken() {
  return localStorage.getItem('token')
}

// Helper function to make API requests
async function apiRequest(endpoint, options = {}) {
  const token = getToken()
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Request failed')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Auth API
export const authAPI = {
  register: async (email, password) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    
    if (response.success && response.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('currentUser', JSON.stringify(response.user))
    }
    
    return response
  },

  login: async (email, password) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    
    if (response.success && response.token) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('currentUser', JSON.stringify(response.user))
    }
    
    return response
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me')
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
  },
}

// Todos API
export const todosAPI = {
  getAll: async () => {
    const response = await apiRequest('/todos')
    return response.todos || []
  },

  getById: async (id) => {
    const response = await apiRequest(`/todos/${id}`)
    return response.todo
  },

  create: async (text) => {
    const response = await apiRequest('/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
    })
    return response.todo
  },

  update: async (id, updates) => {
    const response = await apiRequest(`/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
    return response.todo
  },

  toggle: async (id) => {
    const response = await apiRequest(`/todos/${id}/toggle`, {
      method: 'PATCH',
    })
    return response.todo
  },

  delete: async (id) => {
    await apiRequest(`/todos/${id}`, {
      method: 'DELETE',
    })
  },

  deleteCompleted: async () => {
    const response = await apiRequest('/todos/completed/all', {
      method: 'DELETE',
    })
    return response.deletedCount || 0
  },
}

