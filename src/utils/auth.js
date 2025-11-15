import { authAPI } from './api'

export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null && localStorage.getItem('currentUser') !== null
}

export const registerUser = async (email, password) => {
  try {
    return await authAPI.register(email, password)
  } catch (error) {
    return { success: false, message: error.message || 'Registration failed' }
  }
}

export const loginUser = async (email, password) => {
  try {
    return await authAPI.login(email, password)
  } catch (error) {
    return { success: false, message: error.message || 'Login failed' }
  }
}


