const express = require('express');
const app = express();                  //Creates a server
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Import the Routes
const userRoutes = require('./Routes/userRoutes');
const candidateRoutes = require('./Routes/candidateRoutes');

// Use the routers
app.use('/user', userRoutes);
app.use('/candidate',candidateRoutes);



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});