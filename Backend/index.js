const express = require('express');
const app = express();
const passport = require('./auth');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
//const Person = require('./models/Person');

// Import the database connection
const db = require('./db');

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Middleware function to log requests
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
    next();
};
app.use(logRequest);

// Routes
const personRoutes = require('./routes/personRoutes');
const signInRoutes = require('./routes/signInRoutes');
const signUpRoutes = require('./routes/signUpRoutes');
const profileRoutes = require('./routes/profileRoutes');
const uploadItemRoutes = require('./routes/uploadItemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const HistorySellerRoutes = require('./routes/HistorySellerRoutes');
const FeedbackRoutes = require('./routes/FeedbackRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/SignIn', signInRoutes);
app.use('/SignUp', signUpRoutes);

// Protected routes (require authentication)
app.use('/Profile', profileRoutes);
app.use('/UploadItem', uploadItemRoutes);
app.use('/bidrecord', bidRoutes);
app.use('/SellerHistory', HistorySellerRoutes);
app.use('/Feedback', FeedbackRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
