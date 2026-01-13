import dotenv from 'dotenv';
dotenv.config({ path: process.env.ENV_FILE || '.env' });

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import pizzaRoutes from './routes/pizzaRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5001;
const MONGO_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/hakanpizza';

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
  });
});