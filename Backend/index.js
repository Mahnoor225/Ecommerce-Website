import express from 'express';
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import DBConnection from './DataBase/DBConnection.js';
import Route from './Routers/Routes.js';
import cookieParser from 'cookie-parser';
import CategoryRoute from './Routers/CategoryRoutes.js';
import ProductRoute from './Routers/ProductRoutes.js';
import CartRoute from './Routers/CartRoutes.js';
// Load environment variables from .env file
dotenv.config();

// Debugging - Check if PORT is loaded properly
console.log('Port:', process.env.PORT);  // Should log the value of PORT (e.g., 5000)

// rest object
const app = express();

// Database connection
DBConnection();

// Convert plain text to JSON format
app.use(express.json());
app.use(cookieParser());
// Port declaration
const port = process.env.PORT || '5000';  // Fallback to 5000 if PORT is undefined

// Cross-Origin Resource Sharing (CORS) enabled now
app.use(cors());

// Use routes
app.use('/api/userRoute', Route);
app.use('/api/category', CategoryRoute);
app.use('/api/product', ProductRoute);
app.use('/api/Cart', CartRoute);
// Server listening
app.listen(port, () => {
  console.log(`Server is started at port ${port}`.bgMagenta);
});
