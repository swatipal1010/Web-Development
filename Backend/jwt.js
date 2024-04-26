const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // Extract the JWT token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN, {expiresIn: 30});
        res.user = decoded;
        next();

    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
}

// Generate token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_TOKEN);
};

module.exports = { jwtAuthMiddleware, generateToken };
