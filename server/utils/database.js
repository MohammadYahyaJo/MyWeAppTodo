import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.join(__dirname, '../data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')
const TODOS_DIR = path.join(DATA_DIR, 'todos')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

if (!fs.existsSync(TODOS_DIR)) {
  fs.mkdirSync(TODOS_DIR, { recursive: true })
}

// Users functions
export function getUsers() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      return []
    }
    const data = fs.readFileSync(USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users:', error)
    return []
  }
}

export function saveUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  } catch (error) {
    console.error('Error saving users:', error)
    throw error
  }
}

export function getUserByEmail(email) {
  const users = getUsers()
  return users.find(u => u.email === email)
}

export function getUserById(id) {
  const users = getUsers()
  return users.find(u => u.id === id)
}

// Todos functions
function getTodosFile(userId) {
  return path.join(TODOS_DIR, `${userId}.json`)
}

export function getTodos(userId) {
  try {
    const filePath = getTodosFile(userId)
    if (!fs.existsSync(filePath)) {
      return []
    }
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading todos:', error)
    return []
  }
}

export function saveTodos(userId, todos) {
  try {
    const filePath = getTodosFile(userId)
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2))
  } catch (error) {
    console.error('Error saving todos:', error)
    throw error
  }
}

