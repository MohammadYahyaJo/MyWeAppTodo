# Application Routes & API Endpoints

## Frontend Routes (React Router)

These are the client-side routes that users can navigate to in the browser:

| Route | Description | Authentication Required |
|-------|-------------|------------------------|
| `/` | Root path - redirects to `/login` | No |
| `/login` | Login/Signup page | No (redirects to `/todos` if already logged in) |
| `/todos` | Todo list dashboard | Yes (redirects to `/login` if not authenticated) |

## Backend API Endpoints

The backend server runs on `http://localhost:5000` by default.

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
- **URL:** `POST /api/auth/register`
- **Description:** Register a new user account
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "jwt-token-here",
    "user": {
      "id": "1234567890",
      "email": "user@example.com"
    }
  }
  ```

#### Login User
- **URL:** `POST /api/auth/login`
- **Description:** Login with email and password
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "jwt-token-here",
    "user": {
      "id": "1234567890",
      "email": "user@example.com"
    }
  }
  ```

#### Get Current User
- **URL:** `GET /api/auth/me`
- **Description:** Get the currently authenticated user
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "success": true,
    "user": {
      "id": "1234567890",
      "email": "user@example.com"
    }
  }
  ```

### Todo Endpoints

All todo endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### Get All Todos
- **URL:** `GET /api/todos`
- **Description:** Get all todos for the authenticated user
- **Response:**
  ```json
  {
    "success": true,
    "todos": [
      {
        "id": "1234567890",
        "text": "Complete the project",
        "completed": false,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "userId": "user-id-here"
      }
    ]
  }
  ```

#### Get Todo by ID
- **URL:** `GET /api/todos/:id`
- **Description:** Get a specific todo by its ID
- **Response:**
  ```json
  {
    "success": true,
    "todo": {
      "id": "1234567890",
      "text": "Complete the project",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "userId": "user-id-here"
    }
  }
  ```

#### Create Todo
- **URL:** `POST /api/todos`
- **Description:** Create a new todo
- **Body:**
  ```json
  {
    "text": "New todo item"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Todo created successfully",
    "todo": {
      "id": "1234567890",
      "text": "New todo item",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "userId": "user-id-here"
    }
  }
  ```

#### Update Todo
- **URL:** `PUT /api/todos/:id`
- **Description:** Update a todo (text and/or completion status)
- **Body:**
  ```json
  {
    "text": "Updated todo text",
    "completed": true
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Todo updated successfully",
    "todo": {
      "id": "1234567890",
      "text": "Updated todo text",
      "completed": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T01:00:00.000Z",
      "userId": "user-id-here"
    }
  }
  ```

#### Toggle Todo Completion
- **URL:** `PATCH /api/todos/:id/toggle`
- **Description:** Toggle the completion status of a todo
- **Response:**
  ```json
  {
    "success": true,
    "message": "Todo toggled successfully",
    "todo": {
      "id": "1234567890",
      "text": "Complete the project",
      "completed": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T01:00:00.000Z",
      "userId": "user-id-here"
    }
  }
  ```

#### Delete Todo
- **URL:** `DELETE /api/todos/:id`
- **Description:** Delete a specific todo
- **Response:**
  ```json
  {
    "success": true,
    "message": "Todo deleted successfully"
  }
  ```

#### Delete All Completed Todos
- **URL:** `DELETE /api/todos/completed/all`
- **Description:** Delete all completed todos for the authenticated user
- **Response:**
  ```json
  {
    "success": true,
    "message": "Completed todos deleted successfully",
    "deletedCount": 5
  }
  ```

### Health Check
- **URL:** `GET /api/health`
- **Description:** Check if the server is running
- **Response:**
  ```json
  {
    "status": "OK",
    "message": "Server is running"
  }
  ```

## Testing the API

### Using cURL

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

#### Get Todos (replace TOKEN with actual token)
```bash
curl -X GET http://localhost:5000/api/todos \
  -H "Authorization: Bearer TOKEN"
```

### Using Postman or Insomnia

1. Set the base URL to `http://localhost:5000/api`
2. For protected routes, add header: `Authorization: Bearer <your-token>`
3. Set `Content-Type: application/json` for POST/PUT requests

## Running the Application

### Development Mode

Run both frontend and backend:
```bash
npm run dev:all
```

Or run separately:
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev
```

### Access Points

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## Data Storage

- **Users:** Stored in `server/data/users.json`
- **Todos:** Stored in `server/data/todos/<userId>.json`
- **JWT Tokens:** Stored in browser localStorage (frontend)

## Error Responses

All endpoints return errors in the following format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (invalid token)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error
