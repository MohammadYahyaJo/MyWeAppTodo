# Todo Web Application

A modern, full-featured todo web application with user authentication, built with React, Vite, and Node.js/Express backend.

## Features

- 🔐 **User Authentication**: Secure sign up and login with JWT tokens
- ✅ **Todo Management**: Full CRUD operations for todos
- 🎯 **Filter Todos**: Filter by All, Active, or Completed
- ✏️ **Edit Todos**: Double-click or click edit button to modify todos
- 🗑️ **Delete Todos**: Remove individual todos or clear all completed
- 🔒 **Secure Backend**: RESTful API with JWT authentication
- 💾 **Persistent Storage**: Data stored in JSON files on the server
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. (Optional) Create a `.env` file in the root directory:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

3. Start the development servers:

**Option 1: Run both frontend and backend together**
```bash
npm run dev:all
```

**Option 2: Run separately (in two terminals)**
```bash
# Terminal 1 - Backend Server
npm run dev:server

# Terminal 2 - Frontend
npm run dev
```

4. Open your browser and navigate to:
   - **Frontend:** `http://localhost:3000`
   - **Backend API:** `http://localhost:5000/api`
   - **Health Check:** `http://localhost:5000/api/health`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## Usage

1. **Sign Up**: Create a new account with your email and password
2. **Sign In**: Login with your credentials
3. **Add Todos**: Type in the input field and click "Add Todo"
4. **Complete Todos**: Click the checkbox to mark todos as complete
5. **Edit Todos**: Double-click a todo or click the edit button (✎)
6. **Delete Todos**: Click the delete button (×) to remove a todo
7. **Filter Todos**: Use the filter buttons to view All, Active, or Completed todos
8. **Clear Completed**: Click "Clear Completed" to remove all completed todos at once

## Technology Stack

### Frontend
- **React 18**: UI library
- **React Router**: Client-side routing
- **Vite**: Build tool and dev server
- **CSS3**: Modern styling with CSS variables and animations

### Backend
- **Node.js**: Runtime environment
- **Express**: Web framework
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing
- **File System**: JSON file-based data storage

## Project Structure

```
todo-app/
├── server/
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── todos.js           # Todo CRUD routes
│   ├── utils/
│   │   └── database.js        # File-based database utilities
│   ├── data/                  # Data storage (auto-created)
│   │   ├── users.json         # User data
│   │   └── todos/             # User-specific todo files
│   └── index.js               # Express server entry point
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Login/Signup component
│   │   ├── Login.css
│   │   ├── TodoList.jsx       # Main todo list component
│   │   ├── TodoList.css
│   │   ├── TodoItem.jsx       # Individual todo item
│   │   └── TodoItem.css
│   ├── utils/
│   │   ├── auth.js            # Authentication utilities
│   │   └── api.js             # API client for backend
│   ├── App.jsx                # Main app component with routing
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html
├── package.json
├── vite.config.js
├── .env.example               # Environment variables example
├── ROUTES.md                  # API endpoints documentation
└── README.md
```

## API Documentation

See [ROUTES.md](./ROUTES.md) for complete API endpoint documentation.

### Quick API Reference

- **POST** `/api/auth/register` - Register new user
- **POST** `/api/auth/login` - Login user
- **GET** `/api/auth/me` - Get current user
- **GET** `/api/todos` - Get all todos
- **POST** `/api/todos` - Create todo
- **PUT** `/api/todos/:id` - Update todo
- **PATCH** `/api/todos/:id/toggle` - Toggle todo completion
- **DELETE** `/api/todos/:id` - Delete todo
- **DELETE** `/api/todos/completed/all` - Delete all completed todos

## Notes

- User data and todos are stored in JSON files on the server (`server/data/`)
- Passwords are hashed using bcrypt before storage
- JWT tokens are used for authentication (stored in browser localStorage)
- Each user's todos are stored in separate files
- CORS is enabled for frontend-backend communication

## License

MIT


