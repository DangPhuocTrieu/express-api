import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoute from './routes/User_Management/User.js';
import authRoute from './routes/User_Management/Auth.js';
import tokenRoute from './routes/User_Management/Token.js';
import infoRoute from './routes/User_Management/Info.js';
import productRoute from './routes/Product_Management/Product.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());

// User Management
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/token', tokenRoute);
app.use('/api/info', infoRoute);

// Product Management
app.use('/api/product', productRoute);

// Start server
app.listen(8000, () => {
    console.log('Server started on PORT 8000');
});

