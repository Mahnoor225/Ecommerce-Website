import express from 'express';
import colors from 'colors';
import cors from 'cors'; // Correctly imported
import dotenv from 'dotenv';
import DBConnection from './DataBase/DBConnection.js';
import Route from './Routers/Routes.js';
import cookieParser from 'cookie-parser';
import CategoryRoute from './Routers/CategoryRoutes.js';
import ProductRoute from './Routers/ProductRoutes.js';
import CartRoute from './Routers/CartRoutes.js';
import MylistRoute from './Routers/MylistRouter.js';

// Load environment variables from .env file
dotenv.config();

// Allow only the frontend to access the backend
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies to be sent
};

// Debugging - Check if PORT is loaded properly
console.log('Port:', process.env.PORT);  // Should log the value of PORT (e.g., 5000)

// Create express app
const app = express();

// Database connection
DBConnection();

// Convert plain text to JSON format
app.use(express.json());
app.use(cookieParser());

// Use CORS with options
app.use(cors(corsOptions));

// Define routes
app.use('/api/userRoute', Route);
app.use('/api/category', CategoryRoute);
app.use('/api/product', ProductRoute);
app.use('/api/Cart', CartRoute);
app.use('/api/MyList', MylistRoute);

// Server listening
const port = process.env.PORT || '5000';  // Fallback to 5000 if PORT is undefined
app.listen(port, () => {
  console.log(`Server is started at port ${port}`.bgMagenta);
});
