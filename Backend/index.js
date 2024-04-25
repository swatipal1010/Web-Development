const express = require('express');
const app = express();
const passport = require('./auth');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

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
app.use('/Profile', passport.authenticate('local', { session: false }), profileRoutes);
app.use('/UploadItem', passport.authenticate('local', { session: false }), uploadItemRoutes);
app.use('/bidrecord', passport.authenticate('local', { session: false }), bidRoutes);
app.use('/SellerHistory', passport.authenticate('local', { session: false }), HistorySellerRoutes);
app.use('/Feedback', passport.authenticate('local', { session: false }), FeedbackRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
