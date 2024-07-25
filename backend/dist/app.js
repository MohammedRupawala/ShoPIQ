import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/order.js';
import paymentRoutes from './routes/payments.js';
import dashboardRoutes from './routes/stats.js';
import { connectDB } from './utils/features.js';
import { errorMiddleware } from './middlewares/error.js';
import NodeCache from 'node-cache';
import { config } from 'dotenv';
import morgan from 'morgan';
import Stripe from 'stripe';
// Load environment variables
config({ path: './.env' });
// Initialize Stripe
const stripeKey = process.env.STRIPE_KEY || '';
export const stripe = new Stripe(stripeKey);
// Initialize cache
export const myCache = new NodeCache();
// Initialize Express app
const app = express();
const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || '';
// Middleware
app.use(express.json());
app.use(cors()); // Allow all origin
app.use(morgan('dev'));
// Connect to MongoDB
connectDB(mongoURI);
// Routes
app.get('/', (req, res) => {
    res.send('Hello This is Test Server');
});
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/uploads', express.static('upload'));
// Error handling middleware
app.use(errorMiddleware);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
