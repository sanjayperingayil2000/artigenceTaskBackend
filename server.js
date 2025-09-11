import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.routes.js';
import postsRoutes from './src/routes/posts.routes.js';
import seedDefaultPost from './src/utils/seed.js';

dotenv.config();
const app = express();

// Global middleware
app.use(express.json({ limit: '1mb' }));
app.use(helmet());

// ✅ Allow only localhost frontend for now
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.options("*", cors()); // handle preflight requests

app.use(morgan('dev'));

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// Start server after DB connect
const PORT = process.env.PORT || 5000;
connectDB()
  .then(async () => {
    await seedDefaultPost();
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
