import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import todoRoutes from './routes/todos.js'
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})


// لتحديد المسار الصحيح
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// تقديم ملفات الواجهة الأمامية من مجلد dist
app.use(express.static(path.join(__dirname, '../dist')));

// أي مسار غير موجود في الـ API يرجع إلى index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`)
})


