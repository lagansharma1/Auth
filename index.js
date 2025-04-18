const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
require('dotenv').config();

// Environment variable
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database connection
require('./config/database').connect();

// Routes
app.use('/api/v1/', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
